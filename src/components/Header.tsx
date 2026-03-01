"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSelector";

import dynamic from "next/dynamic";

const CartIcon = dynamic(() => import("@/components/CartIcon"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

export default function Navbar() {
  const t = useTranslations("HomePage");
  const tNav = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8 w-full justify-between">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm font-medium hover:text-blue-600 md:block"
            >
              {t("home")}
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium hover:text-blue-600"
            >
              {tNav("login")}
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              {tNav("register")}
            </Link>
            <LanguageSwitcher />
            <CartIcon />
          </nav>
        </div>
      </div>
    </header>
  );
}
