"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Youtube, href: "#", name: "Youtube" },
  ];

  const quickLinks = [
    { href: "/", label: tNav("home") },
    { href: "/categories", label: tNav("categories") },
    { href: "/products", label: tNav("products") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ];

  const customerService = [
    { href: "#", label: t("links.shipping") },
    { href: "#", label: t("links.returns") },
    { href: "#", label: t("links.privacy") },
    { href: "#", label: t("links.terms") },
  ];

  return (
    <footer className="border-t border-zinc-100 bg-white pt-20 pb-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NextShop
            </Link>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400">
              {t("aboutText")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-all hover:bg-blue-600 hover:text-white dark:bg-zinc-900"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              {t("customerService")}
            </h3>
            <ul className="space-y-4">
              {customerService.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-bold text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              {t("newsletter")}
            </h3>
            <div className="relative group">
              <input
                type="email"
                placeholder={t("newsletterPlaceholder")}
                className="w-full rounded-2xl border-2 border-transparent bg-zinc-50 px-5 py-4 text-sm font-bold outline-none transition-all focus:bg-white focus:border-blue-600 dark:bg-zinc-900 dark:focus:bg-zinc-950"
              />
              <button className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-transform">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 border-t border-zinc-100 pt-10 dark:border-zinc-800">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
