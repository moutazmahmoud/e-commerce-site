"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import categories from "@/data/categories.json";
import { useLocale } from "next-intl";

export default function CategoryStack() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full perspective-1000">
      <div className="absolute inset-0 flex items-center justify-center">
        {categories.map((cat, index) => {
          const name = locale === "ar" ? cat.name_ar : cat.name_en;

          // Calculate relative position (-1, 0, 1, etc.)
          let offset = index - activeIndex;

          // Handle circular array for smooth looping
          if (offset < -categories.length / 2) offset += categories.length;
          if (offset > categories.length / 2) offset -= categories.length;

          const absOffset = Math.abs(offset);
          const isActive = absOffset === 0;

          // Dynamic styles based on distance from center
          const zIndex = 50 - Math.round(absOffset * 10);
          const opacity = Math.max(0, 1 - absOffset * 0.4);
          const scale = 1 - absOffset * 0.15;
          const translateX = offset * 45; // Spread items horizontally
          const translateZ = -absOffset * 100; // Move items back in Z-space
          const rotateY = offset * -25; // Rotate around center

          return (
            <div
              key={cat.id}
              className="absolute h-[320px] w-[240px] overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-zinc-100 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] dark:border-zinc-900 dark:bg-zinc-800"
              style={{
                zIndex,
                opacity,
                transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={cat.image}
                alt={name}
                fill
                className={`object-cover transition-transform duration-[3000ms] ${isActive ? "scale-110" : "scale-100"}`}
                priority={isActive}
                quality={70}
              />
              {/* Premium Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-40"}`}
              />

              {/* Label Content */}
              <div
                className={`absolute bottom-6 left-6 right-6 transition-all duration-1000 transform ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <h3 className="text-xl font-black text-white leading-tight">
                  {name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
