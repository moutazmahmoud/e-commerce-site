"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function CartPage() {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <div>
          <h1 className="text-3xl font-black">{t("empty")}</h1>
          <p className="mt-2 text-zinc-500">{t("emptyDescription")}</p>
        </div>
        <Link
          href="/"
          className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:bg-blue-700 hover:scale-105"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-4xl font-black">{t("title")}</h1>
      <p className="mb-10 text-zinc-500">
        {totalItems()} {t("items")}
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {items.map((item) => {
              const name = locale === "ar" ? item.name_ar : item.name_en;
              return (
                <li key={item.id} className="flex gap-5 py-6">
                  {/* Image */}
                  <Link
                    href={`/product/${item.id}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                  >
                    <Image
                      src={item.image}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-semibold hover:text-blue-600"
                        >
                          {name}
                        </Link>
                        <p className="mt-1 text-sm capitalize text-zinc-400">
                          {item.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${name}`}
                        className="text-zinc-400 transition hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 dark:border-zinc-700">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <p className="text-base font-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-3xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-xl font-black">{t("subtotal")}</h2>
          <div className="space-y-3 text-sm">
            {items.map((item) => {
              const name = locale === "ar" ? item.name_ar : item.name_en;
              return (
                <div key={item.id} className="flex justify-between">
                  <span className="text-zinc-500">
                    {name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="my-6 border-t border-zinc-200 dark:border-zinc-700" />
          <div className="flex justify-between text-xl font-black">
            <span>{t("total")}</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
          >
            {t("checkout")}
          </Link>
          <Link
            href="/"
            className="mt-3 flex w-full items-center justify-center rounded-full border border-zinc-200 py-3 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}
