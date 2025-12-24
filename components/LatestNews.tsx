"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { publications } from "@/data/publications"

/**
 * LatestNews Section inspired by chipsa.design Publications
 * Features an editorial layout with large images and hover effects.
 */
export function LatestNews() {
  const { lang } = useLanguage()

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4 text-neutral-400">
              [ JOURNAL_PUBLICATIONS ]
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              {lang === "en" ? "Latest News" : "Últimas Noticias"}
            </h2>
          </motion.div>
          
          <Link 
            href="/publications"
            className="hidden md:flex font-c text-[10px] uppercase tracking-widest font-bold link-premium-arrow pb-1"
          >
            {lang === "en" ? "View All Publications" : "Ver Todas"} <span className="arrow-icon">→</span>
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {publications.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 mb-8">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">F.</span>
                  </div>
                  <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider backdrop-blur-sm bg-black/20 px-2 py-1 rounded">
                    FANGERDESIGN
                  </span>
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-400">
                  <span className="text-black font-bold">#{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold leading-tight group-hover:text-neutral-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="font-c text-[9px] uppercase tracking-[0.2em] font-bold py-1 link-premium text-black">
                  Read Case Study
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-16 md:hidden">
          <Link 
            href="/publications"
            className="w-full justify-center flex font-mono text-xs uppercase tracking-widest font-bold bg-black text-white py-6 rounded-xl"
          >
            {lang === "en" ? "View All Publications" : "Ver Todas"}
          </Link>
        </div>
      </div>
    </section>
  )
}
