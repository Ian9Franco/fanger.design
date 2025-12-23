"use client"

// Hook para gestionar el idioma global de la aplicación
// Proporciona el idioma actual y función para cambiarlo

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { en } from "@/data/i18n/en"
import { es } from "@/data/i18n/es"

type Language = "en" | "es"

interface LanguageState {
  lang: Language
  setLanguage: (lang: Language) => void
  t: typeof en
}

// Obtener traducciones según el idioma
const getTranslations = (lang: Language) => {
  return lang === "es" ? es : en
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: "en",
      t: en,
      setLanguage: (newLang: Language) => {
        set({ lang: newLang, t: getTranslations(newLang) })
      },
    }),
    {
      name: "language-storage",
    },
  ),
)
