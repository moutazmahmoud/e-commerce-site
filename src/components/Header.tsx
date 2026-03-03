"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSelector";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  LogOut,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const CartIcon = dynamic(() => import("@/components/CartIcon"), {
  ssr: false,
  loading: () => <div className="h-10 w-10" />,
});

export default function Header() {
  const tNav = useTranslations("Navigation");
  const locale = useLocale();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const navLinks = [
    { href: "/", label: tNav("home") },
    { href: "/wishlist", label: tNav("wishlist") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8 w-full justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NextShop
            </Link>
          </div>

          <div className="flex items-center">
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
            <div className="w-4"></div>
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
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 z-[80] h-[100dvh] w-full bg-white dark:bg-zinc-950 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <div className="flex flex-col p-6 pt-24 min-h-full">
            {/* Main Navigation */}
            <div className="space-y-1 mb-10">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 px-4">
                {locale === "ar" ? "القائمة" : "Navigation"}
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-black text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-[0.98]"
                >
                  {link.label}
                  <ArrowRight className="h-5 w-5 text-zinc-300 rtl:rotate-180" />
                </Link>
              ))}
            </div>

            {/* Account / Auth Section */}
            <div className="mt-auto pt-10 border-t border-zinc-100 dark:border-zinc-800">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <button
                    onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                    className="flex w-full items-center justify-between rounded-[2rem] bg-zinc-50 p-4 dark:bg-zinc-900/50 transition-all active:scale-[0.98] border border-transparent hover:border-blue-500/20"
                  >
                    <div className="flex items-center gap-4 text-start">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <User className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-zinc-900 dark:text-white leading-none mb-1.5">
                          {user?.name}
                        </p>
                        <p className="text-xs font-medium text-zinc-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-400 transition-transform duration-500 ${isMobileProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isMobileProfileOpen && (
                    <div className="grid grid-cols-1 gap-2 p-1 animate-in slide-in-from-top-4 fade-in duration-300">
                      <Link
                        href="/wishlist"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 rounded-2xl px-4 py-3.5 font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
                          <Heart className="h-5 w-5" />
                        </div>
                        {tNav("wishlist")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 rounded-2xl px-4 py-3.5 font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10">
                          <LogOut className="h-5 w-5" />
                        </div>
                        {tNav("logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-16 items-center justify-center rounded-2xl border border-zinc-200 px-4 text-xl font-black text-zinc-900 dark:border-zinc-800 dark:text-zinc-100 shadow-sm transition-all active:scale-[0.98]"
                  >
                    {tNav("login")}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-16 items-center justify-center rounded-2xl bg-blue-600 px-4 text-xl font-black text-white shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98] hover:bg-blue-700"
                  >
                    {tNav("register")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
