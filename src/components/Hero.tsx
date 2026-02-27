import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";

export default function Hero() {
  const t = useTranslations("HomePage");
  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
          alt="Hero background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>
      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-xl text-zinc-300">{t("description")}</p>
          <div className="mt-10">
            <Button variant="light" size="lg">
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
