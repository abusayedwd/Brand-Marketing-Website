/** @type {import('next').NextConfig} */
const apiHost = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3050")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

const nextConfig = {
  eslint: {
    // Next.js 15.1.x + ESLint 9 flat config crashes production builds with
    // "Cannot serialize key 'parse' in parser: Function values are not supported."
    // (a Next.js/ESLint tooling bug, unrelated to actual lint errors in this codebase).
    // Lint still runs fine via `npm run lint` locally/CI; just skip it during `next build`.
    ignoreDuringBuilds: true,
  },
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
