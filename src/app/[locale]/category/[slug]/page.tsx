import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import categories from "@/data/categories.json";
import products from "@/data/products.json";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import { Product } from "@/types/product";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const name = locale === "ar" ? category.name_ar : category.name_en;
  const description =
    locale === "ar" ? category.description_ar : category.description_en;
  const canonicalUrl = `https://store.com/${locale}/category/${slug}`;

  return {
    title: `${name} | Store`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://store.com/en/category/${slug}`,
        ar: `https://store.com/ar/category/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Store`,
      description,
      images: [{ url: category.image }],
    },
  };
}

// ─── Static paths ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations("CategoryPage");

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const name = locale === "ar" ? category.name_ar : category.name_en;
  const description =
    locale === "ar" ? category.description_ar : category.description_en;

  const filtered: Product[] = products.filter((p) => p.category === slug);

  return (
    <div>
      {/* Category hero banner */}
      <div className="relative h-56 w-full overflow-hidden bg-zinc-900 md:h-72">
        <Image
          src={category.image}
          alt={name}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            {t("sortLabel") /* reuse label space for breadcrumb feel */}
          </p>
          <h1 className="mt-1 text-4xl font-black text-white md:text-5xl">
            {name}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-zinc-300">{description}</p>
        </div>
      </div>

      {/* Products section */}
      <div className="container mx-auto px-6 py-12">
        <CategoryProductGrid products={filtered} />
      </div>
    </div>
  );
}
