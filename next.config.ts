import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? "" : "",
  basePath: isProd ? "" : "",
  output: "export",
};

export default MillionLint.next()(nextConfig);
