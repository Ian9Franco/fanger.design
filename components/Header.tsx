"use client"

import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "./LanguageToggle"
import { Logo } from "./ui/Logo"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Header fijo */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-white border-b border-black/5 transition-all">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
          
          {/* Logo - Left Side */}
          <Logo />

          {/* Desktop Navigation - CENTERED */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center">
            <ul className="flex items-center gap-10">
              <li>
                <Link 
                  href="/" 
                  className="font-b text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 opacity-60 relative group link-travel pb-1 h-8 flex items-center"
                >
                  {t.header.home}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="font-b text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 opacity-60 relative group link-travel pb-1 h-8 flex items-center"
                >
                  {t.header.about}
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="font-b text-[11px] uppercase tracking-[0.2em] transition-opacity hover:opacity-100 opacity-60 relative group link-travel pb-1 h-8 flex items-center p-0 m-0 border-none bg-transparent appearance-none cursor-pointer"
                >
                  {t.header.whatWeDo}
                </button>
              </li>
            </ul>
          </div>

          {/* Right Side - Email (Desktop) + Language */}
          <div className="hidden md:flex items-center gap-12">
            <a 
              href={`mailto:${t.header.hello}`} 
              className="font-c text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity link-travel pb-1 flex-shrink-0 whitespace-nowrap"
            >
              {t.header.hello}
            </a>
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageToggle />
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="relative w-6 h-4 flex flex-col justify-between transition-all"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span 
                className={`w-full h-0.5 bg-black transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-black transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* "What We Do" popup overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black selection:bg-white selection:text-black"
          >
            <div className="container mx-auto px-6 lg:px-8 h-full flex flex-col">
              {/* Close button - Desktop */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:flex justify-end py-8"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white font-c text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group"
                >
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{t.header.menu.close}</span>
                  <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                </button>
              </motion.div>

              {/* Menu content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 w-full max-w-6xl">
                  {/* Mobile Links */}
                  <div className="md:hidden text-center space-y-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <Link href="/" onClick={() => setMenuOpen(false)} className="block text-4xl font-a font-black text-white">{t.header.home}</Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-4xl font-a font-black text-white">{t.header.about}</Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                      <Link href="/#what-we-do" onClick={() => setMenuOpen(false)} className="block text-4xl font-a font-black text-white">{t.header.whatWeDo}</Link>
                    </motion.div>
                  </div>

                  {/* Who We Help - Desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="hidden md:block"
                  >
                    <h3 className="font-c text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-white/30">{t.header.menu.whoWeHelp}</h3>
                    <ul className="space-y-6">
                      {t.header.menu.helpItems.map((item, i) => {
                        const hrefs = ["/#travel", "/#luxury", "/#islands", "/#islands", "/#islands"];
                        return (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                          >
                            <Link href={hrefs[i] || "#"} onClick={() => setMenuOpen(false)} className="group text-4xl lg:text-5xl font-a font-bold text-white/80 hover:text-white transition-all flex items-center gap-4 link-travel pb-2">
                              <span className="font-c text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                              <span>{item}</span>
                            </Link>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </motion.div>

                  {/* What We Do - Desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="hidden md:block"
                  >
                    <h3 className="font-c text-[10px] font-bold uppercase tracking-[0.4em] mb-12 text-white/30">{t.header.menu.whatWeDo}</h3>
                    <ul className="space-y-6">
                      {t.header.menu.doItems.map((item, i) => {
                         const hrefs = [
                           "/about#we-create", // Strategy
                           "/about#we-create", // Branding
                           "/about#we-design", // Placemaking
                           "/about#we-shape",  // Place Culture
                           "/about#we-create", // PR
                           "/about#we-create", // Social
                           "/about#we-create", // Marketing
                           "/about#we-create"  // Content
                         ];
                         return (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                          >
                            <Link href={hrefs[i] || "#"} onClick={() => setMenuOpen(false)} className="group text-4xl lg:text-5xl font-a font-bold text-white/80 hover:text-white transition-all flex items-center gap-4 link-travel pb-2">
                              <span className="font-c text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                              <span>{item}</span>
                            </Link>
                          </motion.li>
                         )
                      })}
                    </ul>
                  </motion.div>
                </div>
              </div>

              {/* View All Work link */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="py-12 border-t border-white/5 text-center"
              >
                <Link
                  href="/#what-we-do"
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center gap-4 text-[10px] font-c uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                >
                   <span className="inline-block transition-transform group-hover:translate-x-2">↳</span>
                   {t.header.menu.viewAllWork}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
