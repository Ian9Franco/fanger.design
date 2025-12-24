"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { en } from "@/data/i18n/en"
import { es } from "@/data/i18n/es"

type Language = "en" | "es"

// We use the 'en' structure as the base for our Translation type
export type Translation = typeof en

interface LanguageState {
  lang: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

// Map languages to their respective translation files
const translations: Record<Language, Translation> = {
  en: en,
  es: es as unknown as Translation, // Cast to avoid literal mismatch errors
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      t: en,
      setLanguage: (newLang: Language) => {
        set({ lang: newLang, t: translations[newLang] })
      },
    }),
    {
      name: "language-storage",
      // Only persist the language preference, not the entire translation object.
      // This prevents runtime errors if the translation structure changes.
      partialize: (state) => ({ lang: state.lang }),
      // On hydration, restore the correct translation object based on persisted lang
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.lang]
        }
      },
    },
  ),
)
