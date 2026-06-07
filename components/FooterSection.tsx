"use client";

import { COUPLE } from "@/lib/constants";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

export default function FooterSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 30 });

  return (
    <SectionWrapper className="border-t border-gold/10 pb-12 pb-safe sm:pb-16">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-cinzel text-2xl leading-snug text-gold sm:text-3xl md:text-5xl lg:text-6xl">
          Thank You For Being Part Of Our Story
        </h2>
        <GoldDivider />
        <p className="font-cormorant text-xl tracking-widest text-gold sm:text-2xl md:text-3xl">
          {COUPLE.groom} ♥ {COUPLE.bride}
        </p>
        <p className="mt-8 font-montserrat text-[10px] uppercase tracking-[0.4em] text-white/20">
          With love & gratitude
        </p>
      </div>
    </SectionWrapper>
  );
}
