/**
 * PM2 config for running this Next.js app in production on Ubuntu.
 *
 * Usage on EC2:
 *   pnpm install
 *   pnpm build
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 *
 * Notes:
 * - Keep secrets OUT of git.
 * - For a domain deploy, set NEXTAUTH_URL to your public origin.
 */
module.exports = {
  apps: [
    {
      name: "profile",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",

        // NextAuth
        NEXTAUTH_URL: "https://profile.kothreat.us",
        // IMPORTANT: set this to a long random string on the server (do not commit real value)
        NEXTAUTH_SECRET: "replace_me_on_server",

        // Optional: if you want to override the default
        // ADMIN_PASSWORD: "Clash19191",

        // SwitchPointServer scripts
        SWITCHPOINT_CHECK_MODE_PATH: "/usr/local/bin/check_mode",
        SWITCHPOINT_USE_AWS_PATH: "/usr/local/bin/use_aws",
        SWITCHPOINT_USE_VERIZON_PATH: "/usr/local/bin/use_verizon",
      },
    },
  ],
}


