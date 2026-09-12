/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/images/**`)],
  },
};

export default nextConfig;
