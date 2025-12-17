/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // Save RAM/CPU on tiny prod boxes. Run your TS checks locally (e.g. `bun run check`) instead.
    ignoreBuildErrors: process.env.SKIP_BUILD_CHECKS === "1",
  },
}

module.exports = nextConfig


