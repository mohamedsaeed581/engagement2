"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COUPLE, EVENT } from "@/lib/constants";
import { assetPath } from "@/lib/utils";

const photoClassName =
  "h-[210px] w-[145px] object-cover object-top transition-transform duration-700 group-hover:scale-105 sm:h-[280px] sm:w-[190px] md:h-[460px] md:w-[300px]";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-4 py-16 sm:gap-8 sm:px-6 sm:py-20 md:min-h-screen md:flex-row md:flex-wrap md:gap-16 md:px-12 md:py-24 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="order-1 w-full max-w-lg px-1 text-center md:order-2 md:px-0"
      >
        <p className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/40 sm:text-xs sm:tracking-[0.4em]">
          {EVENT.date}
        </p>
        <p className="mt-3 font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/50 sm:mt-4 sm:text-[11px] sm:tracking-[0.35em]">
          Together with their families
        </p>

        <h1 className="mt-4 font-cinzel text-4xl leading-tight text-gold sm:mt-6 sm:text-5xl md:text-7xl lg:text-8xl">
          {COUPLE.groom.toUpperCase()}
          <span className="my-1 block font-cormorant text-3xl font-light italic text-gold-light sm:my-2 sm:text-4xl md:text-5xl">
            &
          </span>
          {COUPLE.bride.toUpperCase()}
        </h1>

        <p className="mt-6 font-cormorant text-lg italic leading-relaxed text-white/60 sm:mt-8 sm:text-xl md:text-2xl">
          Joyfully invite you to celebrate
          <br />
          their engagement
        </p>

        <a
          href="#countdown"
          className="mt-8 inline-block w-full max-w-xs border border-gold px-8 py-3 font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold transition-all hover:bg-gold hover:text-luxury-black hover:shadow-gold sm:mt-10 sm:w-auto sm:px-10 sm:py-3.5 sm:text-[11px] sm:tracking-[0.3em]"
        >
          Discover More
        </a>
      </motion.div>

      <div className="order-2 flex justify-center gap-3 sm:gap-4 md:contents">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="photo-frame group md:order-1"
        >
          <div className="relative overflow-hidden shadow-luxury">
            <Image
              src={assetPath("/images/mohamed.jpg")}
              alt={COUPLE.groom}
              width={300}
              height={460}
              priority
              sizes="(max-width: 768px) 190px, 300px"
              className={photoClassName}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="photo-frame group md:order-3"
        >
          <div className="relative overflow-hidden shadow-luxury">
            <Image
              src={assetPath("/images/rewan.jpg")}
              alt={COUPLE.bride}
              width={300}
              height={460}
              priority
              sizes="(max-width: 768px) 190px, 300px"
              className={photoClassName}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
