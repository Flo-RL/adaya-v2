import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Requis pour Docker
};

export default nextConfig;
