"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/captura-20de-20pantalla-202025-12-20-20031258.png",
    title: "DESTINATIONS & ISLANDS",
    subtitle:
      "ELEVATING TOURISM, REIMAGINING HOTELS AND SHAPING DESTINATIONS WORTH TRAVELLING FOR.",
  },
  {
    id: 2,
    image: "/images/captura-20de-20pantalla-202025-12-20-20031303.png",
    title: "TRAVEL AND HOTELS",
    subtitle:
      "ELEVATING TOURISM, REIMAGINING HOTELS AND SHAPING DESTINATIONS WORTH TRAVELLING FOR.",
  },
  {
    id: 3,
    image: "/images/captura-20de-20pantalla-202025-12-20-20031253.png",
    title: "BUILDING LUXURY CONSUMER BRANDS",
    subtitle: "THAT SHAPE TASTE AND INFLUENCE CULTURE",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const scrollingDown = e.deltaY > 0;

      if (scrollingDown && currentSlide < slides.length - 1) {
        // Avanzar al siguiente slide
        setCurrentSlide((prev) => prev + 1);
        setIsScrolling(true);
      } else if (!scrollingDown && currentSlide > 0) {
        // Retroceder al slide anterior
        setCurrentSlide((prev) => prev - 1);
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 800);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(scrollTimeout);
    };
  }, [currentSlide, isScrolling]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          {/* Background image with enhanced transition */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <Image
                src="/placeholder-img.png"
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
                style={{ willChange: "transform" }}
              />
            </motion.div>
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            {/* Subtitle at top - staggered reveal */}
            {slides[currentSlide].subtitle && (
              <motion.p
                initial={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-12 max-w-4xl text-sm font-bold uppercase tracking-[0.3em] text-white/90 md:text-base drop-shadow-lg"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            )}

            {/* Massive title - enhanced reveal with blur */}
            <motion.h1
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -60, filter: "blur(20px)" }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-6xl font-black leading-[0.85] tracking-tighter text-white md:text-8xl lg:text-[12rem] drop-shadow-2xl"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {slides[currentSlide].title}
            </motion.h1>
          </div>

          {/* Slide counter - refined animation */}
          <div className="absolute right-8 top-1/2 z-20 -translate-y-1/2 text-white">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm font-light tracking-wider"
            >
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced progress bar with smooth transitions */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10 backdrop-blur-sm">
        <motion.div
          className="h-full bg-white shadow-lg shadow-white/20"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Scroll hint indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white text-xs uppercase tracking-widest"
      >
        Scroll
      </motion.div>
    </section>
  );
}
