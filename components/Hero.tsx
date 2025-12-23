"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const { t } = useLanguage()

  // Split title into individual words for animation
  const titleWords = t.hero.title.split(" ")

  // Polaroid images positioned around the text
  const polaroids = [
    {
      src: "/creative-team-collaboration.png",
      className: "absolute left-[5%] top-[20%] rotate-[-8deg] w-32 h-36 hidden lg:block",
    },
    {
      src: "/design-brainstorming.jpg",
      className: "absolute right-[8%] top-[15%] rotate-[12deg] w-28 h-32 hidden lg:block",
    },
    {
      src: "/brand-strategy-meeting.png",
      className: "absolute left-[15%] bottom-[25%] rotate-[6deg] w-36 h-40 hidden lg:block",
    },
    {
      src: "/creative-workspace.png",
      className: "absolute right-[12%] bottom-[20%] rotate-[-10deg] w-32 h-36 hidden lg:block",
    },
    {
      src: "/agency-team-collaboration.jpg",
      className: "absolute left-[50%] top-[10%] rotate-[15deg] w-28 h-32 hidden xl:block",
    },
    {
      src: "/brand-design-work.jpg",
      className: "absolute right-[25%] bottom-[30%] rotate-[-5deg] w-32 h-36 hidden xl:block",
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24 lg:px-8">
      {/* Polaroid images floating around */}
      {polaroids.map((polaroid, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: polaroid.className.includes("rotate-") ? undefined : 0 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={polaroid.className}
        >
          <div className="relative h-full w-full bg-white p-2 shadow-2xl">
            <div className="relative h-[85%] w-full overflow-hidden">
              <Image src={polaroid.src || "/placeholder.svg"} alt="" fill className="object-cover" />
            </div>
          </div>
        </motion.div>
      ))}

      <div className="container mx-auto text-center relative z-10">
        {/* Overline */}
        <motion.p
          className="mb-8 text-sm font-bold uppercase tracking-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          AN
        </motion.p>

        {/* Main headline with word-by-word animation */}
        <h1 className="mb-12 text-6xl font-black leading-[0.85] tracking-tighter md:text-8xl lg:text-[10rem] xl:text-[12rem]">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < titleWords.length - 1 && <span className="inline-block w-4 lg:w-8" />}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-12 max-w-2xl text-balance text-base leading-relaxed md:text-lg lg:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="#work"
            className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-60"
          >
            {t.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
