import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["wallet-adapter-react", "wallet-adapter-plugin"],
  images: {
    domains: [
      "fastly.picsum.photos",
      "8w7jxacwou7sdvtx.public.blob.vercel-storage.com",
    ],
  },
  experimental: {
    reactCompiler: true,
    authInterrupts: true,
  },
  /* config options here */
};

export default nextConfig;
