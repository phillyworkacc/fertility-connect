import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    "/*": ["./private/ebooks/Okadaepub.pdf"],
  },
};

export default nextConfig;
