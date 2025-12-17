#!/bin/bash
set -euo pipefail

# Installs the local "fake" SwitchPointServer scripts into /usr/local/bin
# so the Next.js admin page can be tested safely on a dev machine.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$REPO_ROOT/scripts/switchpoint-fakes"

if [ ! -d "$SRC_DIR" ]; then
  echo "❌ Source dir not found: $SRC_DIR" >&2
  exit 1
fi

echo "Installing fake SwitchPointServer scripts to /usr/local/bin..."

# Use sudo if available; try non-interactive first.
if command -v sudo >/dev/null 2>&1; then
  if sudo -n true >/dev/null 2>&1; then
    SUDO="sudo -n"
  else
    SUDO="sudo"
  fi
else
  SUDO=""
fi

$SUDO install -m 0755 "$SRC_DIR/check_mode" /usr/local/bin/check_mode
$SUDO install -m 0755 "$SRC_DIR/use_aws" /usr/local/bin/use_aws
$SUDO install -m 0755 "$SRC_DIR/use_verizon" /usr/local/bin/use_verizon

echo "✅ Installed:"
ls -l /usr/local/bin/check_mode /usr/local/bin/use_aws /usr/local/bin/use_verizon


