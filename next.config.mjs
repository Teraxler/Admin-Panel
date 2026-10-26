/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
