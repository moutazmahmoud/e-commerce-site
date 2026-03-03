import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  const values = [
    {
      title: t("values.quality"),
      description: t("values.qualityDesc"),
      icon: "✨",
    },
    {
      title: t("values.innovation"),
      description: t("values.innovationDesc"),
      icon: "🚀",
    },
    {
      title: t("values.customer"),
      description: t("values.customerDesc"),
      icon: "❤️",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute top-[40%] -left-[10%] h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[80px]" />
        </div>
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-zinc-400">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto mt-20 px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale opacity-20">
              NextShop
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5" />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              {t("ourStory")}
            </h2>
            <p className="mt-8 text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("description")}
            </p>
            <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("storyText")}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto mt-32 px-6">
        <div className="rounded-[4rem] bg-zinc-50 p-12 dark:bg-zinc-900/50 lg:p-24 border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-center text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {t("values.title")}
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 dark:bg-zinc-900"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-3xl group-hover:scale-110 transition-transform dark:bg-zinc-800">
                  {v.icon}
                </div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                  {v.title}
                </h3>
                <p className="mt-4 font-medium text-zinc-500 dark:text-zinc-400">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
