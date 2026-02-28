import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import categories from "@/data/categories.json";

export default function FeaturedCategories() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {t("categoriesSubtitle")}
          </p>
          <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {t("categoriesTitle")}
          </h2>
        </div>

        {/* Category grid — first card large, rest smaller */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, index) => {
            const name = locale === "ar" ? cat.name_ar : cat.name_en;
            const description =
              locale === "ar" ? cat.description_ar : cat.description_en;
            const isFirst = index === 0;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800 ${
                  isFirst ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                style={{ minHeight: isFirst ? "420px" : "200px" }}
              >
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes={
                    isFirst
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, 25vw"
                  }
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className={`font-black tracking-tight text-white ${
                      isFirst ? "text-3xl" : "text-xl"
                    }`}
                  >
                    {name}
                  </h3>
                  {isFirst && (
                    <p className="mt-2 text-sm text-zinc-300">{description}</p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                    Shop now →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Explore all link */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 px-8 py-3 font-bold text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-900"
          >
            {t("exploreAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
