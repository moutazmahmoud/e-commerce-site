"use client";

import { ShoppingCart, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useTranslations } from "next-intl";
import type { Product } from "@/types/product";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const t = useTranslations("Cart");

  return (
    <button
      disabled={!product.inStock}
      onClick={() => addItem(product)}
      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-700"
    >
      <ShoppingCart className="h-6 w-6" />
      {product.inStock ? t("addToCart") : t("outOfStock")}
    </button>
  );
}
