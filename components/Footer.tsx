"use client"

import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:px-8 lg:py-32">
        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center"
        >
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
            {lang === "en" ? "we are example" : "somos example"}
          </p>
          <h2 className="mb-12 text-balance text-7xl font-black md:text-8xl lg:text-9xl tracking-tighter leading-[0.9]">
            {lang === "en" ? "Let's talk" : "Hablemos"}
          </h2>
          <p className="mb-12 text-3xl font-bold uppercase tracking-wider md:text-4xl">
            {lang === "en" ? "READY TO TALK? Get In Touch" : "¿LISTO PARA HABLAR? Contáctanos"}
          </p>
          <div className="space-y-3">
            <p>
              <a 
                href="mailto:hello@weareexample.com" 
                className="group text-xl transition-all duration-300 inline-block relative"
              >
                <span className="link-underline">hello@weareexample.com</span>
              </a>
            </p>
            <p>
              <a 
                href="tel:+61283224600" 
                className="group text-xl transition-all duration-300 inline-block relative"
              >
                <span className="link-underline">+61 2 8322 4600</span>
              </a>
            </p>
          </div>
        </motion.div>

        {/* Grid de links */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 border-t border-neutral-700/50 pt-16 md:grid-cols-3 lg:gap-20"
        >
          {/* Columna 1: Navigation */}
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-base transition-all hover:opacity-100 opacity-70 link-underline inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base transition-all hover:opacity-100 opacity-70 link-underline inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/what-we-do" className="text-base transition-all hover:opacity-100 opacity-70 link-underline inline-block">
                  What We Do
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 2: Social */}
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              {lang === "en" ? "Follow Us" : "Síguenos"}
            </h3>
            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110 hover:opacity-100 opacity-70 duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-7 w-7" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110 hover:opacity-100 opacity-70 duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Columna 3: Credits */}
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Credits</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Design by{" "}
              <a href="#" className="hover:text-white transition-colors link-underline inline-block">
                somefolk.co
              </a>
            </p>
            <p className="text-sm text-neutral-400">
              Development by{" "}
              <a href="#" className="hover:text-white transition-colors link-underline inline-block">
                kujira.co
              </a>
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 border-t border-neutral-700/50 pt-10 text-center"
        >
          <p className="text-xs text-neutral-500 tracking-wider">
            {lang === "en" ? "©2025 Fanger. All Rights Reserved." : "©2025 Fanger. Todos los derechos reservados."}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
