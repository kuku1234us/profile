const skipBuildChecks = process.env.SKIP_BUILD_CHECKS === "1";

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
    // Save RAM/CPU on tiny prod boxes. Run `bun run typecheck` on your dev machine instead.
    ignoreBuildErrors: skipBuildChecks,
  },
};

export default nextConfig;
