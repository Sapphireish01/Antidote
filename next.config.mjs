const rawTarget =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
const backendTarget = (
  rawTarget.startsWith("http://") || rawTarget.startsWith("https://")
    ? rawTarget
    : "http://3.72.105.190"
).replace(/\/+$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${backendTarget}/:path*`,
      },
    ];
  },
};

export default nextConfig;
