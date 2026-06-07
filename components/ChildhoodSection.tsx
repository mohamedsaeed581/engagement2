"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CHILDHOOD_IMAGES } from "@/lib/constants";
import { assetPath } from "@/lib/utils";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

const polaroidStyles = [
  { rotate: -2, hoverRotate: 0 },
  { rotate: 2, hoverRotate: 0 },
];

export default function ChildhoodSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 50 });

  return (
    <SectionWrapper id="memories" label="Our story">
      <div ref={ref} className="mx-auto max-w-5xl text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Where Every Beautiful Story Begins
        </h2>
        <p className="mt-3 font-cormorant text-lg italic text-white/50 sm:mt-4 sm:text-xl md:text-2xl">
          Childhood Memories
        </p>
        <GoldDivider />

        <div className="mx-auto grid max-w-sm grid-cols-1 gap-6 sm:max-w-4xl sm:grid-cols-2 sm:gap-8 md:gap-10">
          {CHILDHOOD_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, rotate: polaroidStyles[i].rotate - 1, y: 40 }}
              whileInView={{
                opacity: 1,
                rotate: polaroidStyles[i].rotate,
                y: 0,
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{
                rotate: polaroidStyles[i].hoverRotate,
                scale: 1.02,
              }}
              className="polaroid p-3 pb-8 sm:p-4 sm:pb-12"
            >
              <div className="relative overflow-hidden shadow-luxury">
                <Image
                  src={assetPath(img.src)}
                  alt={img.alt}
                  width={720}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 font-cormorant text-lg italic text-white/40">
          The beginning of forever ✦
        </p>
      </div>
    </SectionWrapper>
  );
}
