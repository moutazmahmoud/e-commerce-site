"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Link } from "@/i18n/navigation";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <ShoppingCart className="h-5 w-5" />
      </div>
    );
  }

  return (
    <Link
      href="/cart"
      aria-label={`Cart (${count} items)`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white/50 transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 shadow-sm"
    >
      <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-zinc-400" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white ring-2 ring-white dark:ring-zinc-950 shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
