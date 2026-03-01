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
