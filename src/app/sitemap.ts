import { MetadataRoute } from "next";
import categories from "@/data/categories.json";
import products from "@/data/products.json";
import { routing } from "@/i18n/routing";

const baseUrl = "https://nextshop.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  // Static routes
  const staticRoutes = ["", "/about", "/contact", "/categories"];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // Add static pages
    staticRoutes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    });

    // Add category pages
    categories.forEach((category) => {
      entries.push({
        url: `${baseUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

    // Add product pages
    products.forEach((product) => {
      entries.push({
        url: `${baseUrl}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.6,
      });
    });
  });

  return entries;
}
