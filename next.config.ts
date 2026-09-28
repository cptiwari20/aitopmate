import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are served from Unsplash's CDN (free license). See src/lib/photos.ts.
    // `search` is omitted so Unsplash crop params (e.g. ?crop=faces) are allowed.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" }],
    qualities: [75],
  },
};

export default nextConfig;
