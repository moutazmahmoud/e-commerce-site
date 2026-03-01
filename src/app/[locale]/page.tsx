import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <Hero />
      <FeaturedCategories />
    </div>
  );
}
