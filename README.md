This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin auth (NextAuth)

- **Login**: `http://localhost:3000/login`
- **Admin**: `http://localhost:3000/admin` (requires login)

Create a `.env.local` using `env.example` as a template:

- **`NEXTAUTH_URL`**: `http://localhost:3000`
- **`NEXTAUTH_SECRET`**: a long random string (required in production)
- **`ADMIN_PASSWORD`** (optional): defaults to `Clash19191`

## Deploying to Ubuntu EC2 with Bun (systemd)

This project is intended to run in **Bun-only mode** in both development and production. In practice, that means:

- Bun is used for dependency installs: `bun install`
- Bun is used to run the app: `bun run dev`, `bun run build`, `bun run start`
- The EC2 process manager is **systemd**, not PM2 (PM2 is Node-based).

One important operational detail is that the included `deploy.sh` is an **artifact deploy**: it uploads a pre-built `.next/` bundle and then extracts runtime files onto the server. Because of that, the server “runtime directory” is not a great place to also do Git operations. If you run `git pull` in a directory that is being overwritten by deployments, Git will frequently stop with errors like “local changes would be overwritten” even when you did not manually edit anything.

If you want both behaviors, the simplest pattern is to keep **two separate folders** on the server:

- A **runtime folder** (example: `/home/ubuntu/profile-app`) that `deploy.sh` writes into and `systemd` runs from.
- A **repo folder** (example: `/home/ubuntu/profile-repo`) that is a normal `git clone` where you can safely run `git pull` for inspection/debugging.

### Environment variables

Avoid committing `.env` files. Instead:

- **Local dev**: create `.env.local` from `env.example`
- **EC2 production**: create `.env.production.local` on the server (gitignored) and set at least:
  - `NEXTAUTH_URL=https://profile.kothreat.us`
  - `NEXTAUTH_SECRET=...` (long random string)
  - `SKIP_BUILD_CHECKS=1` (optional; skips build-time TS checks on small boxes)

### Deploy script

Use `deploy.sh`. It will:

1. Build the app locally (producing `.next`)
2. Upload the minimal runtime bundle to EC2
3. Run `bun install --production --frozen-lockfile` on the server when `bun.lock` changed
4. Install/update a `systemd` unit (`profile.service`) and restart it

If you previously used PM2, the deploy script will remove the old PM2 process to avoid port conflicts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
