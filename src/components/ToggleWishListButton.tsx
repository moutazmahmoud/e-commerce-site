"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/types/product";

export default function ToggleWishListButton({
  product,
}: {
  product: Product;
}) {
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  return (
    <button
      onClick={() => toggleItem(product)}   
      className="flex h-14 w-14 items-center justify-center rounded-full transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
    >
      <Heart className="h-6 w-6 stroke-red-500" fill={isInWishlist ? "red" : "white"}/>
    </button>
  );
}
