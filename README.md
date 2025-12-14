This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

## Deploying to Ubuntu EC2 with PM2 (recommended env setup)

Avoid editing `.env` files per environment:

- **Local dev (Windows)**: use `.env.local` (gitignored)
- **EC2 production**: use `.env.production.local` (gitignored) OR PM2 `env_production` in `ecosystem.config.cjs`

Quick start on EC2:

Option A (keep your current PM2 start command):

1. Create `.env.production.local` on the EC2 box and set:
   - `NEXTAUTH_URL=https://profile.kothreat.us`
   - `NEXTAUTH_SECRET=...` (long random string)
   - `SKIP_BUILD_CHECKS=1` (skips Next build-time ESLint + TypeScript checks to save RAM)
   - any other prod-only vars (e.g. SwitchPointServer script paths)
2. Build and start:
   - `pnpm install`
   - `pnpm check` (run this on your laptop before you push to GitHub)
   - `pnpm build`
   - `pm2 start pnpm --name profile -- start`

Option B (PM2 ecosystem file):

1. Copy `ecosystem.config.cjs` and **edit `NEXTAUTH_URL` + `NEXTAUTH_SECRET`** on the server.
2. Build and start:
   - `pnpm install`
   - `pnpm build`
   - `pm2 start ecosystem.config.cjs --env production`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
