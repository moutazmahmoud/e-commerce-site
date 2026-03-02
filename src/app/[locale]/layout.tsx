import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Header";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextShop",
  description: "NextShop - E-commerce website",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "en" ? "ltr" : "rtl";
  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-white dark:bg-zinc-950`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="flex min-h-screen flex-col italic:not-italic font-normal">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
