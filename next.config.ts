const skipBuildChecks = process.env.SKIP_BUILD_CHECKS === "1";

const nextConfig = {
  // Bun-only production runtime: build a self-contained server bundle we can execute with `bun`,
  // without relying on a Node.js binary on the host.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // Save RAM/CPU on tiny prod boxes. Run `bun run typecheck` on your dev machine instead.
    ignoreBuildErrors: skipBuildChecks,
  },
};

export default nextConfig;
