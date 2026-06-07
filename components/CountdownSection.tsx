"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/constants";
import { formatCountdown } from "@/lib/utils";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const distance = new Date(EVENT.dateISO).getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Minutes" },
  { key: "seconds" as const, label: "Seconds" },
];

export default function CountdownSection() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const ref = useScrollReveal<HTMLDivElement>({ y: 40 });

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="countdown" label="Save the date" className="bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Counting Down To Our Special Day
        </h2>
        <GoldDivider />

        <div className="mx-auto grid max-w-sm grid-cols-2 gap-4 sm:max-w-none sm:gap-6 md:flex md:flex-wrap md:justify-center md:gap-8">
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="group relative mx-auto flex aspect-square w-full max-w-[9.5rem] flex-col items-center justify-center rounded-full border border-gold/25 bg-white/[0.03] backdrop-blur-md transition-all hover:border-gold/60 hover:shadow-gold sm:max-w-[10.5rem] md:h-40 md:w-40 md:max-w-none"
            >
              <div className="absolute inset-2 rounded-full border border-gold/10 sm:inset-3" />
              <span className="font-cinzel text-3xl font-semibold text-gold sm:text-4xl md:text-5xl">
                {key === "days" ? time[key] : formatCountdown(time[key])}
              </span>
              <span className="mt-2 font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/40">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
