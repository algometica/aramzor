import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/session", "/profile", "/api"],
      },
    ],
    sitemap: "https://aramzor.com/sitemap.xml",
  };
}
