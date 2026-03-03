import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import categoriesData from "@/data/categories.json";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function CategoriesPage() {
  const locale = await getLocale();

  // Note: Since this is a server component, we use the server-side translation approach
  // or pass down to a client component for more dynamic features.
  // For now, keeping it simple as a server-rendered list.

  return (
    <main className="min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-blue-600/10 p-4 text-blue-600 dark:bg-blue-600/20">
              <LayoutGrid className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl">
            {locale === "ar" ? "جميع الفئات" : "All Categories"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-zinc-500 dark:text-zinc-400">
            {locale === "ar"
              ? "اكتشف مجموعتنا المتنوعة من المنتجات المصنفة بعناية لتناسب احتياجاتك."
              : "Explore our curated collections across various categories and find exactly what you're looking for."}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="container mx-auto mt-16 px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categoriesData.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative h-[400px] overflow-hidden rounded-[2.5rem] bg-zinc-100 transition-all hover:shadow-2xl dark:bg-zinc-800"
            >
              <Image
                src={category.image}
                alt={locale === "ar" ? category.name_ar : category.name_en}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <h2 className="text-4xl font-black text-white mb-3">
                    {locale === "ar" ? category.name_ar : category.name_en}
                  </h2>
                  <p className="max-w-md text-lg font-medium text-zinc-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {locale === "ar"
                      ? category.description_ar
                      : category.description_en}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-white font-bold">
                    <span className="uppercase tracking-widest text-sm">
                      {locale === "ar" ? "استكشف" : "Explore"}
                    </span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
