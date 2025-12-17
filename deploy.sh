#!/bin/bash

# --- CONFIGURATION ---
SERVER_IP="18.211.104.93"
# Using $HOME ensures it works on your machine without hardcoding /home/kothreat
SSH_KEY="$HOME/.ssh/abab1234usAWSNewYork.pem"
# Bun is installed per-user by default. Use an absolute path so non-interactive shells work.
LOCAL_BUN_BIN="${LOCAL_BUN_BIN:-$HOME/.bun/bin/bun}"
SERVICE_NAME="profile"
PORT="3000"
# ---------------------

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

echo "🚀 Starting Optimized Deployment Pipeline..."

# SSH options:
# - BatchMode=yes: never prompt (fail fast if auth isn't set up)
# - StrictHostKeyChecking=accept-new: auto-accept first-time host keys (still protects against changes)
# - ConnectTimeout: avoid hanging on network issues
SSH_OPTS=(
  -o BatchMode=yes
  -o StrictHostKeyChecking=accept-new
  -o ConnectTimeout=10
)

# 1. Validate local artifacts exist (build is done separately).
if [ ! -d ".next" ]; then
  echo "❌ .next/ not found. Run your local build step first (e.g. 'bun run build')."
  exit 1
fi

if [ ! -d "public" ]; then
  echo "❌ public/ not found. Are you running from the project root?"
  exit 1
fi

# 2. Generate checksum of lockfile to skip server installs when deps haven't changed.
if [ ! -f "bun.lock" ]; then
  echo "❌ bun.lock not found. Run '$LOCAL_BUN_BIN install' first."
  exit 1
fi

LOCAL_HASH=$(md5sum bun.lock | cut -d ' ' -f 1)
echo "🔍 Local dependency hash: $LOCAL_HASH"

# 3. Package artifacts (no build/check here; just ship what already exists)
echo "📦 Packaging artifacts..."
# Include only what's needed to run `next start` in production.
tar -czf deploy.tar.gz .next public package.json bun.lock next.config.*

# 4. Upload to Server
echo "📤 Uploading package to $SERVER_IP..."
scp "${SSH_OPTS[@]}" -i "$SSH_KEY" deploy.tar.gz ubuntu@$SERVER_IP:/tmp/deploy.tar.gz

# 5. Remote Execution
echo "🤖 Connecting to server..."
ssh "${SSH_OPTS[@]}" -i "$SSH_KEY" ubuntu@$SERVER_IP \
  "SERVICE_NAME='$SERVICE_NAME' PORT='$PORT' LOCAL_HASH='$LOCAL_HASH' bash -s" << 'EOF'
    set -euo pipefail
    APP_DIR="/home/ubuntu/profile"
    
    # --- Find Bun in a non-interactive SSH session ---
    # Do NOT rely on shell init files (.bashrc/.profile). Instead, look for Bun in common locations.
    export BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
    # Ensure core utilities exist even if the remote PATH is misconfigured (we saw `mkdir: command not found`).
    BASE_PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    export PATH="$BUN_INSTALL/bin:$HOME/.local/bin:$BASE_PATH"

    BUN_BIN=""
    if [ -x "$BUN_INSTALL/bin/bun" ]; then
        BUN_BIN="$BUN_INSTALL/bin/bun"
    elif [ -x "$HOME/.bun/bin/bun" ]; then
        BUN_BIN="$HOME/.bun/bin/bun"
    elif [ -x "$HOME/.local/bin/bun" ]; then
        BUN_BIN="$HOME/.local/bin/bun"
    elif command -v bun >/dev/null 2>&1; then
        BUN_BIN="$(command -v bun)"
    elif [ -x "/usr/local/bin/bun" ]; then
        BUN_BIN="/usr/local/bin/bun"
    elif [ -x "/usr/bin/bun" ]; then
        BUN_BIN="/usr/bin/bun"
    elif [ -x "/snap/bin/bun" ]; then
        BUN_BIN="/snap/bin/bun"
    elif command -v bun-js >/dev/null 2>&1; then
        # Some installs (e.g. snap) may name the binary bun-js.
        BUN_BIN="$(command -v bun-js)"
    fi

    if [ -z "$BUN_BIN" ]; then
        echo "   ❌ bun not found in non-interactive SSH environment."
        echo "      Tried: $BUN_INSTALL/bin/bun, $HOME/.bun/bin/bun, $HOME/.local/bin/bun, PATH, /usr/local/bin/bun, /snap/bin/bun, bun-js"
        echo "      Fix options:"
        echo "        - Install Bun as the ubuntu user (recommended) so it lives in /home/ubuntu/.bun/bin/bun"
        echo "        - Or create a stable symlink: sudo ln -sf /home/ubuntu/.bun/bin/bun /usr/local/bin/bun"
        exit 1
    fi
    
    mkdir -p "$APP_DIR"

    # Check existing hash on server
    OLD_HASH=""
    if [ -f "$APP_DIR/bun.lock.hash" ]; then
        OLD_HASH=$(cat "$APP_DIR/bun.lock.hash")
    fi

    echo "   ↳ Unpacking files..."
    tar -xzf /tmp/deploy.tar.gz -C "$APP_DIR"
    cd "$APP_DIR"

    # Cleanup stray lockfiles that confuse Next.js workspace-root inference and output tracing.
    # These can be leftovers from earlier experiments (npm/pnpm) and are not needed in bun-only mode.
    rm -f "$HOME/pnpm-lock.yaml" || true
    rm -f "$APP_DIR/package-lock.json" || true

    # Compare hashes to decide if we need a server-side install
    if [ "$LOCAL_HASH" != "$OLD_HASH" ]; then
        echo "   ⚠️  Dependencies changed! Running bun install..."
        "$BUN_BIN" install --production --frozen-lockfile
        echo "$LOCAL_HASH" > bun.lock.hash
    else
        echo "   ✅ Dependencies unchanged. Skipping install."
    fi

    echo "   ↳ Ensuring systemd service ($SERVICE_NAME.service)..."
    # Install/update the systemd unit (bun-only runtime).
    # Use `sudo -n` so the deploy is non-interactive. IMPORTANT: many setups allow only specific
    # commands (command-scoped NOPASSWD), so we validate sudo by running an allowed command.
    SYSCTL="$(command -v systemctl || echo /usr/bin/systemctl)"
    TEE_BIN="$(command -v tee || echo /usr/bin/tee)"
    UNIT_PATH="/etc/systemd/system/${SERVICE_NAME}.service"

    if ! sudo -n "$SYSCTL" daemon-reload >/dev/null 2>&1; then
        echo "   ❌ Passwordless sudo is required for systemd setup (tee/systemctl)."
        echo "      It looks like sudo in this non-interactive SSH session still needs a password."
        echo "      Fix on EC2 (run once):"
        echo "        sudo visudo -f /etc/sudoers.d/${SERVICE_NAME}-deploy"
        echo "      Add this SINGLE LINE (don't wrap):"
        echo "        ubuntu ALL=(root) NOPASSWD: ${TEE_BIN} ${UNIT_PATH}, ${SYSCTL} daemon-reload, ${SYSCTL} enable --now ${SERVICE_NAME}.service, ${SYSCTL} restart ${SERVICE_NAME}.service"
        echo "      Then validate:"
        echo "        sudo visudo -cf /etc/sudoers.d/${SERVICE_NAME}-deploy"
        echo "        sudo ls -l /etc/sudoers.d/${SERVICE_NAME}-deploy   # should be root:root and 0440"
        echo "        sudo -u ubuntu sudo -n ${SYSCTL} daemon-reload      # should succeed with no prompt"
        exit 1
    fi

    sudo -n tee "/etc/systemd/system/$SERVICE_NAME.service" >/dev/null << UNIT
[Unit]
Description=$SERVICE_NAME (Next.js via Bun)
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/profile
Environment=NODE_ENV=production
Environment=PORT=$PORT
Environment=BUN_INSTALL=/home/ubuntu/.bun
Environment=PATH=/home/ubuntu/.bun/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# Run Next's CLI with Bun (no Node.js binary required).
# We invoke Next's real JS entrypoint (not node_modules/.bin/next) to avoid any Node shebang wrappers.
ExecStart=$BUN_BIN /home/ubuntu/profile/node_modules/next/dist/bin/next start --port $PORT --hostname 0.0.0.0
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
UNIT

    sudo -n "$SYSCTL" daemon-reload
    sudo -n "$SYSCTL" enable --now "$SERVICE_NAME.service"
    sudo -n "$SYSCTL" restart "$SERVICE_NAME.service"

    # If it failed to start, print a useful tail of logs and exit non-zero.
    if ! sudo -n "$SYSCTL" is-active --quiet "$SERVICE_NAME.service"; then
        echo "   ❌ Service failed to start. Status + logs:"
        sudo -n "$SYSCTL" status "$SERVICE_NAME.service" --no-pager -l || true
        sudo -n journalctl -u "$SERVICE_NAME.service" -n 120 --no-pager -l || true
        exit 1
    fi

    rm /tmp/deploy.tar.gz
    echo "✅ Remote Server Updated!"
EOF

# 6. Local Cleanup
rm deploy.tar.gz
echo "🎉 Deployment Complete!"