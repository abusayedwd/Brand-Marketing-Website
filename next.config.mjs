/** @type {import('next').NextConfig} */
const apiHost = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3050")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: apiHost.split(":")[0] || "localhost",
        port: apiHost.includes(":") ? apiHost.split(":")[1] : "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: apiHost.split(":")[0] || "localhost",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
