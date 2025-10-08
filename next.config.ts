import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/x/inngest", destination: "/api/inngest" },
      { source: "/.netlify/functions/inngest", destination: "/api/inngest" },
      { source: "/.redwood/functions/inngest", destination: "/api/inngest" },
    ];
  },
};

export default nextConfig;
