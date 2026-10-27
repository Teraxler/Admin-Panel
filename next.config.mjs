/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    unoptimized: true,
    // dangerouslyAllowLocalIP: true,
    formats: ["image/webp"],
    remotePatterns: [
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/images/**`),
    ],
  },
};

export default nextConfig;
