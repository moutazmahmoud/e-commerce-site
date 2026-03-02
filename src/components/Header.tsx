"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSelector";
import { useAuthStore } from "@/store/authStore";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const CartIcon = dynamic(() => import("@/components/CartIcon"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

export default function Navbar() {
  const t = useTranslations("HomePage");
  const tNav = useTranslations("Navigation");
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  const navLinks = [{ href: "/", label: t("home") }];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8 w-full justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Commerce
            </Link>
          </div>

          <div className="flex items-center gap-1 md:gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-4 w-px bg-gray-200 dark:bg-zinc-800 mx-1" />

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-3 py-1.5 text-sm font-semibold hover:bg-gray-50 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 transition-all shadow-sm"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </button>

                  {isAccountOpen && (
                    <div className="absolute end-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-1 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50 dark:border-zinc-900">
                        <p className="text-xs font-medium text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="h-4 w-4" />
                        {tNav("logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-sm font-semibold text-gray-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors px-2"
                  >
                    {tNav("login")}
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
                  >
                    {tNav("register")}
                  </Link>
                </div>
              )}
            </nav>

            <div className="flex items-center gap-2 pl-2 md:pl-0 md:border-none dark:border-zinc-800">
              <LanguageSwitcher />
              <CartIcon />
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ms-2 flex items-center justify-center hover:bg-gray-100/50 dark:hover:bg-zinc-900/50 rounded-xl md:hidden transition-colors relative z-[100]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900 dark:text-zinc-100" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900 dark:text-zinc-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 z-[80] h-[100dvh] w-full bg-white/95 backdrop-blur-xl dark:bg-zinc-950/95 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-6 pt-24 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 border-b border-gray-50 dark:border-zinc-900 pb-4"
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="space-y-6 pt-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-3xl font-extrabold tracking-tight underline decoration-blue-500 underline-offset-4">
                    {user?.name}
                  </p>
                  <p className="text-sm font-medium text-gray-500 dark:text-zinc-500">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 text-xl font-bold text-red-600 pt-4"
                >
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                    <LogOut className="h-6 w-6" />
                  </div>
                  {tNav("logout")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-16 items-center justify-center rounded-2xl border border-gray-200 px-4 text-xl font-bold text-gray-900 dark:border-zinc-800 dark:text-zinc-100 shadow-sm"
                >
                  {tNav("login")}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-16 items-center justify-center rounded-2xl bg-blue-600 px-4 text-xl font-bold text-white shadow-xl shadow-blue-600/30 active:scale-95 transition-transform"
                >
                  {tNav("register")}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
