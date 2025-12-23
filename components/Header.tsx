"use client"

import Link from "next/link"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { LanguageToggle } from "./LanguageToggle"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const { t, lang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  // Logo como letras individuales - FANGER
  const logoLetters = ["F", "A", "N", "G", "E", "R"]

  // Menu items for "What We Do" popup
  const whatWeDoCategories = {
    whoWeHelp: ["Travel & Hotels", "Consumer Brands", "Property", "Entertainment", "Hospitality"],
    whatWeDo: ["Strategy", "Branding", "Placemaking", "Place Culture", "PR", "Social", "Marketing", "Content"],
  }

  return (
    <>
      {/* Header fijo */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/40 transition-all">
        <nav className="container mx-auto flex items-center justify-between px-6 py-5 lg:px-8">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center gap-0 group">
            {logoLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="text-2xl font-black text-black transition-all duration-300 group-hover:tracking-wide"
              >
                {letter}
              </motion.span>
            ))}
          </Link>

          {/* Desktop Navigation - CENTERED */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-8">
              <li>
                <Link 
                  href="/" 
                  className="relative text-sm font-medium transition-opacity hover:opacity-100 opacity-70 link-underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="relative text-sm font-medium transition-opacity hover:opacity-100 opacity-70 link-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="relative text-sm font-medium transition-opacity hover:opacity-100 opacity-70 link-underline"
                >
                  What We Do
                </button>
              </li>
            </ul>
          </div>

          {/* Right Side - Email (Desktop) + Language */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="mailto:hello@fanger.design" 
              className="text-xs font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
            >
              HELLO@FANGER.DESIGN
            </a>
            <LanguageToggle />
          </div>

          {/* Mobile menu button - Animated 2-line Hamburger */}
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

      {/* "What We Do" popup overlay - full screen BLACK background */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="container mx-auto px-6 lg:px-8 h-full flex flex-col">
              {/* Close button - Hidden on mobile, X is in header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hidden md:flex justify-end py-6"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium hover:opacity-100 opacity-70 transition-all flex items-center gap-2 group text-white"
                >
                  <span className="link-underline">CLOSE</span>
                  <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                </button>
              </motion.div>

              {/* Menu content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 w-full max-w-6xl">
                  {/* Mobile: Single column centered links */}
                  <div className="md:hidden text-center space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="block text-5xl font-black text-white hover:opacity-70 transition-opacity"
                      >
                        HOME
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link
                        href="/about"
                        onClick={() => setMenuOpen(false)}
                        className="block text-5xl font-black text-white hover:opacity-70 transition-opacity"
                      >
                        ABOUT
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        href="/what-we-do"
                        onClick={() => setMenuOpen(false)}
                        className="block text-5xl font-black text-white hover:opacity-70 transition-opacity"
                      >
                        WHAT WE DO
                      </Link>
                    </motion.div>
                  </div>
                  {/* Who We Help - Desktop only */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                    transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:block"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-neutral-400">WHO WE HELP</h3>
                    <ul className="space-y-5">
                      {whatWeDoCategories.whoWeHelp.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          transition={{ 
                            delay: 0.25 + i * 0.06, 
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <Link
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="group text-3xl lg:text-4xl font-medium hover:opacity-100 opacity-80 transition-all flex items-center gap-3 text-white"
                          >
                            <span className="inline-block transition-transform group-hover:translate-x-2">↳</span>
                            <span className="link-underline">{item}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* What We Do - Desktop only */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                    transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden md:block"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-neutral-400">WHAT WE DO</h3>
                    <ul className="space-y-5">
                      {whatWeDoCategories.whatWeDo.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          transition={{ 
                            delay: 0.35 + i * 0.06,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <Link
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="group text-3xl lg:text-4xl font-medium hover:opacity-100 opacity-80 transition-all flex items-center gap-3 text-white"
                          >
                            <span className="inline-block transition-transform group-hover:translate-x-2">↳</span>
                            <span className="link-underline">{item}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              {/* Footer - Email and Social (Mobile) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="md:hidden py-10 text-center space-y-6"
              >
                <a 
                  href="mailto:hello@fanger.design"
                  className="block text-2xl font-bold text-white hover:opacity-70 transition-opacity"
                >
                  HELLO@FANGER.DESIGN
                </a>
                <div className="flex items-center justify-center gap-8">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold uppercase tracking-wider text-white hover:opacity-70 transition-opacity"
                  >
                    INSTAGRAM
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold uppercase tracking-wider text-white hover:opacity-70 transition-opacity"
                  >
                    LINKEDIN
                  </a>
                </div>
              </motion.div>

              {/* View All Work link - Desktop only */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="hidden md:block py-10 text-center"
              >
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] hover:opacity-100 opacity-70 transition-all text-white"
                >
                  <span className="inline-block transition-transform group-hover:translate-x-2">↳</span>
                  <span className="link-underline">VIEW ALL WORK</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
