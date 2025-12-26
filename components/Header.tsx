"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "./LanguageToggle"
import { Logo } from "./ui/Logo"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

/**
 * Osmo-style Floating Header with Overlay Menu
 */
export function Header() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Transform header width/style based on scroll
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"])
  const headerY = useTransform(scrollY, [0, 100], [0, 20])
  
  // Basic scroll detection
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        style={{
          width: isScrolled ? headerWidth : "100%",
          y: isScrolled ? headerY : 0,
        }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 mx-auto transition-all duration-500 ease-[0.22,1,0.36,1]",
          isScrolled 
            ? "max-w-5xl px-6 py-3 bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-sm rounded-full" 
            : "px-8 py-6 bg-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 relative z-50">
            <Logo />
          </div>

          {/* Center Navigation (Desktop Pill) */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <ul className={cn(
              "flex items-center gap-1 p-1 transition-all duration-300",
              isScrolled ? "" : "bg-neutral-100/50 rounded-full border border-neutral-200/50"
            )}>
              <li>
                <Link href="/" className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-black transition-all hover:bg-white rounded-full">
                  {t.header.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-black transition-all hover:bg-white rounded-full">
                  {t.header.about}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-black transition-all hover:bg-white rounded-full flex items-center gap-2"
                >
                  {t.header.whatWeDo}
                  <span className={`text-[10px] transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
              </li>
              <li>
                <Link href="/contact" className="px-5 py-2 text-xs font-medium uppercase tracking-wider text-neutral-600 hover:text-black transition-all hover:bg-white rounded-full">
                  {t.header.contact}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Area */}
          <div className="flex items-center gap-4 relative z-50">
            <LanguageToggle />
            
            <Link 
              href="/contact"
              className={cn(
                "hidden md:flex bg-black text-white text-[10px] uppercase font-bold tracking-widest px-6 py-2.5 rounded-full",
                "hover:scale-105 transition-transform duration-300 active:scale-95"
              )}
            >
              {t.header.hello}
            </Link>

            {/* Mobile/Menu Toggle Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <div className="space-y-1.5 w-6">
                <motion.span 
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} 
                  className="block w-full h-0.5 bg-black" 
                />
                <motion.span 
                  animate={{ opacity: menuOpen ? 0 : 1 }} 
                  className="block w-full h-0.5 bg-black" 
                />
                <motion.span 
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} 
                  className="block w-full h-0.5 bg-black" 
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* FULL SCREEN OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex items-center justify-center pt-24 pb-12"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-6 h-full flex flex-col relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 h-full py-12">
                
                {/* Left Column - WHO WE HELP */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="border-b border-black/10 pb-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                      {t.header.menu.whoWeHelp}
                    </h3>
                  </div>
                  <ul className="space-y-6">
                    {t.header.menu.helpItems.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-neutral-400 hover:text-black transition-colors cursor-default"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - WHAT WE DO */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="border-b border-black/10 pb-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                      {t.header.menu.whatWeDo}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {t.header.menu.doItems.map((item, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="list-none group cursor-pointer"
                      >
                        <Link href="/#services" onClick={() => setMenuOpen(false)} className="flex items-center justify-between py-4 border-b border-neutral-100 group-hover:border-black/20 transition-all">
                          <span className="text-lg md:text-xl font-medium group-hover:pl-4 transition-all duration-300">
                            {item}
                          </span>
                          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            →
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </div>
                </div>

              </div>

              {/* Menu Footer */}
              <div className="mt-auto flex justify-between items-end border-t border-black/10 pt-8">
                 <Link href="/work" className="text-sm font-bold uppercase tracking-widest link-premium-arrow">
                    {t.header.menu.viewAllWork}
                 </Link>
                 <button onClick={() => setMenuOpen(false)} className="text-xs font-mono uppercase text-neutral-400 hover:text-black transition-colors">
                    {t.header.menu.close} [ESC]
                 </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
