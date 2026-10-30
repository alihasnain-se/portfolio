import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a phone on the same Wi-Fi load the dev server (npm run dev) through your PC's LAN IP.
  // Next 15.5+/16 otherwise blocks those requests and the page never hydrates.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
};

export default nextConfig;
