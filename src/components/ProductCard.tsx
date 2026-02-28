"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const locale = useLocale();
  const name = locale === "ar" ? product.name_ar : product.name_en;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <Link
        href={`/product/${product.id}`}
        className="relative h-52 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-800">
              Out of stock
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.id}`} className="flex-1">
          <h3 className="font-semibold leading-snug text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            aria-label={`Add ${name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:bg-blue-700 active:scale-90 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-700"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
