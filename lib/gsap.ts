"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const { y = 60, duration = 1, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay]);

  return ref;
}

export function useGsapContext(callback: () => void, deps: unknown[] = []) {
  useEffect(() => {
    const ctx = gsap.context(callback);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
