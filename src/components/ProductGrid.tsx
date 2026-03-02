import products from "@/data/products.json";
import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";
import type { Product } from "@/types/product";

export default function ProductGrid() {
  const t = useTranslations("HomePage");

  // Show first 8 products for the home page
  const featuredProducts = (products as Product[]).slice(0, 8);

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t("productsTitle")}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t("productsSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
