import { Home, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
        <Search className="h-12 w-12" />
      </div>
      <h1 className="text-6xl font-black tracking-tight">404</h1>
      <p className="mt-4 max-w-md text-zinc-500">{t("message")}</p>
      <Button href="/" variant="primary" size="lg" className="mt-10">
        <Home className="h-5 w-5" />
        {t("backToHome")}
      </Button>
    </div>
  );
}
