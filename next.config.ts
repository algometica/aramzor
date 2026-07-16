import type { NextConfig } from "next";

const STATIC_CACHE = "public, max-age=3600, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/about",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/science",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/breathing/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_CACHE }],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
