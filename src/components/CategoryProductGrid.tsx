"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryProductGrid({
  products,
}: {
  products: Product[];
}) {
  const t = useTranslations("CategoryPage");
  const locale = useLocale();
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  if (products.length === 0) {
    return <p className="py-24 text-center text-zinc-400">{t("noProducts")}</p>;
  }

  return (
    <>
      {/* Toolbar: count + sort */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-zinc-500">
          <span className="font-semibold text-zinc-900 dark:text-white">
            {products.length}
          </span>{" "}
          {t("results")}
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {t("sortLabel")}:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="default">{t("sortDefault")}</option>
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((product) => {
          const name = locale === "ar" ? product.name_ar : product.name_en;
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-800">
                      {t("outOfStock")}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="flex-1 font-semibold leading-snug text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {name}
                </h3>
                <p className="mt-3 text-lg font-black text-zinc-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
