"use client";

import { EVENT } from "@/lib/constants";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

const DETAILS = [
  { icon: "📅", title: "Date", value: EVENT.date },
  { icon: "🕖", title: "Time", value: EVENT.time },
  { icon: "📍", title: "Venue", value: EVENT.venue },
];

export default function EventDetailsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40 });

  return (
    <SectionWrapper id="details" label="Join us">
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Event Details
        </h2>
        <GoldDivider />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {DETAILS.map((item) => (
            <div
              key={item.title}
              className="group mx-auto w-full max-w-sm border border-gold/15 bg-luxury-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-gold/40 hover:shadow-luxury sm:max-w-none sm:p-8 md:p-10"
            >
              <div className="mb-4 text-2xl opacity-80 sm:mb-5 sm:text-3xl">{item.icon}</div>
              <h3 className="font-cinzel text-xs tracking-[0.2em] text-gold sm:text-sm">
                {item.title}
              </h3>
              <p className="mt-3 font-cormorant text-lg text-white/80 sm:mt-4 sm:text-xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
