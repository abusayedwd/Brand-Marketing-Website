/** @type {import('next').NextConfig} */

// The REAL backend origin (e.g. http://168.231.67.56:3050). Server-side only —
// never exposed to the browser. Used to (a) proxy /api/* so the browser never
// has to talk to an insecure http:// backend directly (avoids mixed-content
// blocking once this app is on https://…vercel.app), and (b) resolve the host
// for next/image's remotePatterns.
//
// NEXT_PUBLIC_API_URL stays what client code actually fetches from:
//   - local dev: point it straight at the backend, e.g. http://localhost:3050
//   - production (Vercel): set it to the relative path "/api" so requests hit
//     this app's own domain (same-origin, https) and get rewritten below.
const backendOrigin = process.env.BACKEND_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3050";
const apiHost = backendOrigin
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
  async rewrites() {
    // Only active when BACKEND_INTERNAL_URL is set (i.e. NEXT_PUBLIC_API_URL is
    // the relative "/api"). In local dev, NEXT_PUBLIC_API_URL is usually already
    // a direct backend URL, so there's nothing to proxy.
    if (!process.env.BACKEND_INTERNAL_URL) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_INTERNAL_URL.replace(/\/$/, "")}/:path*`,
      },
    ];
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
