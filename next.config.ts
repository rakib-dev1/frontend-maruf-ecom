import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
