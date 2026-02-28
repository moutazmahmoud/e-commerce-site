"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Link } from "@/i18n/navigation";

export default function CartIcon() {
  const totalItems = useCartStore((s) => s.totalItems);
  const count = totalItems();

  return (
    <Link
      href="/cart"
      aria-label={`Cart (${count} items)`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-black text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
