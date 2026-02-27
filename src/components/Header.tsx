import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSelector";

export default function Navbar() {
  const t = useTranslations("HomePage");

  return (
    <header className="w-full border-b bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              {t("home")}
            </Link>
            <div className="flex items-center gap-2 border-x px-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
