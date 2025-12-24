"use client"

/**
 * Animated Language Toggle Component
 */
import { useLanguage } from "@/hooks/use-language"
import { motion, AnimatePresence } from "framer-motion"

export function LanguageToggle() {
  const { lang, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(lang === "en" ? "es" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group relative flex items-center justify-center h-8 px-4 font-c text-[10px] uppercase tracking-[0.3em] overflow-hidden border border-black/10 hover:border-black transition-colors"
      aria-label="Toggle language"
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {lang === "en" ? "EN" : "ES"}
          </motion.span>
        </AnimatePresence>
      </div>
      
      {/* Visual background indicator */}
      <motion.div 
        className="absolute inset-0 bg-black -z-10"
        initial={{ y: "100%" }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <style jsx>{`
        button:hover {
          color: white;
        }
      `}</style>
    </button>
  )
}
