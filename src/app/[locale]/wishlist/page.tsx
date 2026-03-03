"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const t = useTranslations("Wishlist");
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-50 text-zinc-300 dark:bg-zinc-900">
          <Heart className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          {t("empty")}
        </h1>
        <p className="mt-4 max-w-md text-lg font-medium text-zinc-500 dark:text-zinc-400">
          {t("emptyDescription")}
        </p>
        <Link
          href="/"
          className="mt-10 flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="h-5 w-5" />
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("continueShopping")}
              </Link>
              <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
                {t("title")}
              </h1>
            </div>
            <div className="rounded-2xl bg-white px-6 py-3 shadow-sm dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                {items.length} {t("items")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
