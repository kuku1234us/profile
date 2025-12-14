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
  eslint: {
    // Save RAM/CPU on tiny prod boxes. Run `pnpm check` on your dev machine instead.
    ignoreDuringBuilds: skipBuildChecks,
  },
  typescript: {
    // Save RAM/CPU on tiny prod boxes. Run `pnpm typecheck` on your dev machine instead.
    ignoreBuildErrors: skipBuildChecks,
  },
};

export default nextConfig;
