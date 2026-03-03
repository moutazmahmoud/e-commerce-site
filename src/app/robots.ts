import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/wishlist", "/cart", "/checkout"],
    },
    sitemap: "https://nextshop.com/sitemap.xml",
  };
}
