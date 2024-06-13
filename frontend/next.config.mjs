/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a106318.tech",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/internal/:path*",
        destination: "https://a106318.tech/api/:path*", // Proxy to Backend
      },
      {
        source: "/master/:path*",
        destination: "https://a106318.tech/api/tasks/:path*", // Proxy to Backend
      },
      {
        source: "/dev/:path*",
        destination: "http://localhost:8080/api/tasks/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
