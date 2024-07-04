import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }, { hostname: "img.clerk.com" }],
  },
};

export default withNextVideo(nextConfig, { folder: "y" });
