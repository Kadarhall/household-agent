import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@household-agent/agent",
    "@household-agent/calendar",
    "@household-agent/database",
    "@household-agent/household",
    "@household-agent/shared",
  ],
};

export default nextConfig;
