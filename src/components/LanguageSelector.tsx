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
      className="px-3 py-1 text-sm font-medium transition-colors hover:text-blue-600"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
