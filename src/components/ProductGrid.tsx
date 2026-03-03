import products from "@/data/products.json";
import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";
import type { Product } from "@/types/product";

export default function ProductGrid() {
  const t = useTranslations("HomePage");

  // Show first 8 products for the home page
  const featuredProducts = (products as Product[]).slice(0, 8);

  return (
    <section className="py-24 relative bg-background-muted overflow-hidden">
      {/* Premium subtle grid texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container relative z-10 mx-auto px-4">
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
