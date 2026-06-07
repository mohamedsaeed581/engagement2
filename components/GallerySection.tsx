"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";
import { assetPath } from "@/lib/utils";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const ref = useScrollReveal<HTMLDivElement>({ y: 40 });

  useEffect(() => {
    if (lightbox === null) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  return (
    <SectionWrapper id="gallery" label="Gallery">
      <div ref={ref} className="mx-auto max-w-6xl text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Our Moments
        </h2>
        <GoldDivider />

        <Swiper
          modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          spaceBetween={12}
          coverflowEffect={{
            rotate: 8,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
          className="gallery-swiper !pb-12 !pt-2 sm:!pb-14 sm:!pt-4"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <SwiperSlide key={i} className="!w-[220px] sm:!w-[280px] md:!w-[340px]">
              <button
                onClick={() => setLightbox(i)}
                aria-label={`View ${img.alt} enlarged`}
                className="group relative block w-full overflow-hidden shadow-luxury transition-transform duration-500 hover:scale-[1.03]"
              >
                <Image
                  src={assetPath(img.src)}
                  alt={img.alt}
                  width={340}
                  height={480}
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 340px"
                  className="h-[300px] w-full object-cover sm:h-[360px] md:h-[440px]"
                />
                <div className="absolute inset-0 bg-gold/0 transition-colors group-hover:bg-gold/10" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${GALLERY_IMAGES[lightbox].alt} photo`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 sm:p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              ref={closeButtonRef}
              className="absolute right-4 top-4 pt-safe font-cinzel text-2xl text-gold sm:right-6 sm:top-6"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={assetPath(GALLERY_IMAGES[lightbox].src)}
                alt={GALLERY_IMAGES[lightbox].alt}
                width={900}
                height={1200}
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
