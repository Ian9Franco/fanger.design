"use client"

import type React from "react"

// Inspirado en la sección "Etcetera" de weareexample.com

import { motion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"

export function CTASection() {
  const { lang } = useLanguage()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[fanger.design] Newsletter signup:", email)
    // Aquí iría la lógica de suscripción
    setEmail("")
  }

  return (
    <section className="py-32 lg:py-40">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 80, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Overline */}
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            {lang === "en" ? "And We're Clued Up on Culture..." : "Y Estamos al Tanto de la Cultura..."}
          </p>

          {/* Título */}
          <h2 className="mb-12 text-7xl font-black md:text-8xl lg:text-9xl tracking-tighter leading-[0.9]">
            {lang === "en" ? "Etcetera" : "Etcétera"}
          </h2>

          {/* Subtítulo */}
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
            {lang === "en" ? "Our culture newsletter" : "Nuestro newsletter de cultura"}
          </p>

          {/* Descripción */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {lang === "en"
              ? "Want to get your finger on the pulse? Sign up to our newsletter, Etcetera, and join over 15k people getting the latest in design, branding and culture news."
              : "¿Quieres estar al día? Suscríbete a nuestro newsletter, Etcétera, y únete a más de 15k personas que reciben las últimas noticias de diseño, branding y cultura."}
          </p>

          <p className="mb-10 text-xs text-muted-foreground uppercase tracking-widest">
            {lang === "en" ? "Always Free. Unsubscribe Anytime." : "Siempre Gratis. Cancela Cuando Quieras."}
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "en" ? "Enter your email" : "Ingresa tu email"}
              required
              className="flex-1 border-b-2 border-foreground bg-transparent px-4 py-4 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 focus:border-foreground/70 transition-all"
            />
            <button
              type="submit"
              className="bg-foreground px-10 py-4 text-sm font-bold uppercase tracking-[0.3em] text-background transition-all hover:bg-foreground/90 hover:scale-105 active:scale-95"
            >
              {lang === "en" ? "Join" : "Unirse"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
