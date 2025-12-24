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

// Custom cursor effect
export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;
    if (!cursor || !cursorFollower) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update cursor position
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Update follower with delay
      gsap.to(cursorFollower, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    // Hover effects
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.getAttribute('data-cursor-text');
      const textElement = document.getElementById('cursor-text');
      const follower = document.getElementById('cursor-follower');

      if (cursorText && textElement && follower) {
        textElement.textContent = cursorText;
        gsap.to(textElement, { opacity: 1, duration: 0.3 });
        gsap.to(follower, { 
          width: 'auto', 
          height: '40px', 
          borderRadius: '20px',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to([cursor, cursorFollower], {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      const textElement = document.getElementById('cursor-text');
      const follower = document.getElementById('cursor-follower');

      if (textElement && follower) {
        gsap.to(textElement, { opacity: 0, duration: 0.2 });
        gsap.to(follower, { 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      gsap.to([cursor, cursorFollower], {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .interactive, [data-cursor-text]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter as EventListener);
      el.addEventListener('mouseleave', onMouseLeave as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter as EventListener);
        el.removeEventListener('mouseleave', onMouseLeave as EventListener);
      });
    };
  }, []);

  return { cursorRef, cursorFollowerRef };
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
