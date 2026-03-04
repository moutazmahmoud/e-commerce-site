import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import CategoryStack from "./CategorySlider";

export default function Hero() {
  const t = useTranslations("HomePage");
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[85vh] grid-cols-1 items-center lg:gap-12 gap-2 px-6 lg:grid-cols-2">
        <div className="max-w-2xl pt-4 lg:py-0">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/50 px-4 py-2 text-sm font-bold text-blue-700 backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            {t("badge")}
          </div>

          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-zinc-900 sm:text-7xl lg:text-8xl dark:text-white">
            {t("titleLine1")}{" "}
            <span className="block text-blue-600 dark:text-blue-500">
              {t("titleLine2")}
            </span>
          </h1>

          <p className="mt-4 lg:mt-8 max-w-lg text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {t("description")}
          </p>

          {/* CTA buttons */}
          <div className="mt-6 lg:mt-12 flex flex-wrap items-center gap-6">
            <Button
              href="/products"
              variant="primary"
              size="lg"
              className="h-14 px-10 text-lg font-bold shadow-2xl shadow-blue-600/30 hover:scale-105 transition-transform"
            >
              {t("button")}
            </Button>
            <Button
              href="#categories"
              variant="outline"
              size="lg"
              className="h-14 px-10 text-lg font-bold border-2"
            >
              {t("browseCategories")}
            </Button>
          </div>

          {/* Stats row */}
          {/* <div className="mt-16 flex items-center gap-12 border-t border-zinc-100 pt-10 dark:border-zinc-800">
            {[
              { value: "10K+", label: t("stat1") },
              { value: "50+", label: t("stat2") },
              { value: "4.9★", label: t("stat3") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div> */}
        </div>
        <div className="relative  lg:block">
          <div className="relative aspect-square w-full ">
            <CategoryStack />
          </div>
        </div>
      </div>
    </section>
  );
}
