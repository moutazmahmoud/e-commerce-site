import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("HomePage");
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-zinc-950 text-white">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30" />
      </div>

      {/* Decorative accent glow */}
      <div className="absolute left-1/4 top-1/3 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[92vh] items-center px-6">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {t("badge")}
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {t("titleLine1")}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-zinc-300 sm:text-xl">
            {t("description")}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/products" variant="primary" size="lg">
              {t("button")}
            </Button>
            <Link
              href="/categories"
              className="text-base font-semibold text-white/80 underline-offset-4 transition hover:text-white hover:underline"
            >
              {t("browseCategories")} →
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap gap-10">
            {[
              { value: "10K+", label: t("stat1") },
              { value: "50+", label: t("stat2") },
              { value: "4.9★", label: t("stat3") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
