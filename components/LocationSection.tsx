"use client";

import { EVENT } from "@/lib/constants";
import SectionWrapper, { GoldButton, GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

export default function LocationSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40 });

  return (
    <SectionWrapper id="location" label="Find us">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Location
        </h2>
        <p className="mt-3 font-cormorant text-lg italic text-white/50 sm:mt-4 sm:text-xl">
          {EVENT.venue}
        </p>
        <GoldDivider />

        <div className="overflow-hidden border border-gold/20 shadow-luxury">
          <iframe
            src={EVENT.mapsEmbedUrl}
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map to ${EVENT.venue}`}
            className="h-[280px] w-full grayscale-[30%] contrast-[1.1] sm:h-[340px] md:h-[400px]"
          />
        </div>

        <div className="mt-8 sm:mt-10">
          <GoldButton href={EVENT.mapsLink}>View Location</GoldButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
