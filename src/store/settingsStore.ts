import { create } from "zustand";
import { persist } from "zustand/middleware";

type SettingsStore = {
  locale: string;
  setLocale: (locale: string) => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "settings-storage",
    },
  ),
);
