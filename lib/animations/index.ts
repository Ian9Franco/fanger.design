import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Smooth scroll with Lenis
let lenis: any;

export const initSmoothScrolling = async () => {
  if (typeof window !== 'undefined') {
    const Lenis = (await import('lenis')).default;
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
};

// ScrollTrigger configuration
export const setupScrollTrigger = () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    scroller: 'body',
  });
};

// Text reveal animation
export const useTextReveal = (ref: React.RefObject<HTMLElement>, delay = 0) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const text = ref.current;
    const chars = text.textContent?.split('') || [];
    
    // Wrap each character in a span
    text.textContent = '';
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      text.appendChild(span);

      // Animate each character with a slight delay
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay + i * 0.02,
        ease: 'power3.out',
      });
    });
  }, [ref, delay]);
};

// Scroll reveal animation
export const useScrollReveal = (ref: React.RefObject<HTMLElement>, options = {}) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const element = ref.current;
    
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
          ...options,
        },
      }
    );
  }, [ref, options]);
};
