"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import categories from "@/data/categories.json";
import { useLocale } from "next-intl";

export default function CategoryStack() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(3); // Start with last one (Accessories)

  // Use exactly 4 categories as requested
  const displayCategories = categories.slice(0, 4).map((cat, index) => ({
    src: cat.image,
    // Distribute rotations for 4 items
    rotation:
      index === 0
        ? "-rotate-[16deg]"
        : index === 1
          ? "-rotate-[10deg]"
          : index === 2
            ? "-rotate-4"
            : "rotate-0",
    offset:
      index === 0
        ? "-translate-x-16 -translate-y-16"
        : index === 1
          ? "-translate-x-10 -translate-y-10"
          : index === 2
            ? "-translate-x-4 -translate-y-4"
            : "translate-x-0 translate-y-0",
    label: locale === "ar" ? cat.name_ar : cat.name_en,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % displayCategories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayCategories.length]);

  return (
    <div className="relative h-full w-full">
      {displayCategories.map((item, index) => {
        const isActive = activeIndex === index;

        // Dynamic classes based on active state
        const zIndex = isActive ? 50 : 10 + index;
        const scale = isActive ? "scale-100" : "scale-90 opacity-40";
        const rotation = isActive ? "rotate-0 shadow-2xl" : item.rotation;
        const translate = isActive
          ? "translate-x-4 -translate-y-4"
          : item.offset;

        return (
          <div
            key={index}
            className={`absolute inset-20 overflow-hidden rounded-[3rem] border-8 border-white bg-zinc-100 shadow-xl transition-all duration-1000 ease-in-out dark:border-zinc-900 dark:bg-zinc-800 ${rotation} ${translate} ${scale}`}
            style={{ zIndex }}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className={`object-cover transition-transform duration-[2000ms] ${isActive ? "scale-110" : "scale-100"}`}
              priority={index === 3}
            />
            {/* Overlay for better text readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
            />

            {/* Label */}
            <div
              className={`absolute bottom-8 left-8 transition-all duration-1000 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                Explore Category
              </p>
              <h3 className="text-2xl font-black text-white">{item.label}</h3>
            </div>
          </div>
        );
      })}

      {/* Trust Badge stays on top */}
      <div className="absolute -bottom-2 -left-2 z-[60] rounded-3xl bg-white/90 p-4 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/90 border border-white/20 scale-90">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <span className="text-xl font-bold">✓</span>
          </div>
          <div>
            <p className="font-bold text-zinc-900 dark:text-white leading-tight">
              Premium Quality
            </p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              Verified Collections
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
