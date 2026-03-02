"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    // @ts-ignore
    router.replace({ pathname, params }, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-10 px-4 items-center justify-center rounded-full border border-gray-100 bg-white/50 text-xs font-bold uppercase tracking-widest text-gray-500 transition-all hover:bg-gray-100 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-blue-400 shadow-sm"
    >
      {locale === "en" ? "Ar" : "En"}
    </button>
  );
}
