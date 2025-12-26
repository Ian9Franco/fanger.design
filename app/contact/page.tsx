"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { TextReveal } from "@/components/ui/TextReveal"

// UPDATE: Contact page created from scratch, inspired by Yucca
// Referencia: https://yucca.co.za/contact (structure, hierarchy, animations)
// Motivo: Crear página de contacto profesional con formulario funcional y oficinas

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // UPDATE: Simulated form submission - integrate with your backend
    // In production, replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", company: "", message: "" })

      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="bg-white pt-32 pb-24 overflow-hidden">
      {/* Technical grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 border border-black/10 font-c text-[10px] uppercase tracking-[0.3em] text-black/60">
                {t.contact.hero.label}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 text-6xl md:text-8xl lg:text-9xl font-a font-black leading-[0.85] tracking-tighter"
            >
              <span className="block">{t.contact.hero.title1}</span>
              <span className="block text-neutral-300">{t.contact.hero.title2}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-b text-neutral-600 max-w-3xl"
            >
              <TextReveal text={t.contact.hero.subtitle} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Offices Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-a font-bold mb-4">{t.contact.hero.label}</h2>
                <p className="font-c text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Fill out the form below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.form.name}
                    className="w-full bg-transparent border-b-2 border-black/20 py-4 text-lg font-b text-black placeholder:text-black/30 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.form.email}
                    className="w-full bg-transparent border-b-2 border-black/20 py-4 text-lg font-b text-black placeholder:text-black/30 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                {/* Company Input */}
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t.contact.form.company}
                    className="w-full bg-transparent border-b-2 border-black/20 py-4 text-lg font-b text-black placeholder:text-black/30 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.form.message}
                    className="w-full bg-transparent border-b-2 border-black/20 py-4 text-lg font-b text-black placeholder:text-black/30 focus:border-black focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-c text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? t.contact.form.sending : t.contact.form.send}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-b text-green-600"
                  >
                    {t.contact.form.success}
                  </motion.p>
                )}
                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-b text-red-600"
                  >
                    {t.contact.form.error}
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Offices Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-a font-bold mb-4">{t.contact.offices.title}</h2>
                <p className="font-c text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  {t.contact.offices.locations.length} locations worldwide
                </p>
              </div>

              {/* Office Cards */}
              <div className="space-y-8">
                {t.contact.offices.locations.map((office, index) => (
                  <motion.div
                    key={office.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-6 md:p-8 border border-black/10 hover:border-black/30 transition-all duration-300 group"
                  >
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black/20 group-hover:border-black/60 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black/20 group-hover:border-black/60 transition-colors" />

                    <div className="space-y-4">
                      {/* City Name */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-a font-bold mb-1">{office.name}</h3>
                        <p className="font-c text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                          {office.region}
                        </p>
                      </div>

                      {/* Email */}
                      <a
                        href={`mailto:${office.email}`}
                        className="flex items-center gap-3 text-base font-b hover:opacity-60 transition-opacity link-premium-arrow"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{office.email}</span>
                      </a>

                      {/* Address */}
                      <div className="flex items-start gap-3 text-sm font-b text-neutral-600">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative z-10 py-24 mt-24 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-a font-black mb-6">{t.contact.interested}</h2>
            <p className="text-lg md:text-xl font-b text-white/70 mb-8">
              We typically respond within 24 hours during business days.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={`mailto:${t.header.hello}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-c text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all duration-300 group"
              >
                <span>Email Us</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
