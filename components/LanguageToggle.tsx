"use client"

// Botón para alternar entre idiomas
// Muestra EN / ES y persiste la selección

import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-60"
      aria-label="Toggle language"
    >
      {language === "en" ? "EN" : "ES"} / {language === "en" ? "ES" : "EN"}
    </button>
  )
}
