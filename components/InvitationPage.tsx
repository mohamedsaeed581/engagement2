"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import OpeningScreen from "@/components/OpeningScreen";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import ChildhoodSection from "@/components/ChildhoodSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import FooterSection from "@/components/FooterSection";
import GoldParticles from "@/components/GoldParticles";
import MusicControl from "@/components/MusicControl";
import { assetPath } from "@/lib/utils";

export default function InvitationPage() {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [particleCount, setParticleCount] = useState(35);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateParticles = () => {
      setParticleCount(window.innerWidth < 768 ? 18 : 35);
    };

    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, []);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const handleContinue = () => {
    setStarted(true);
    playMusic();
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <GoldParticles count={particleCount} />

      <audio ref={audioRef} loop preload="auto">
        <source src={assetPath("/music/music.mp3")} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!started && <OpeningScreen onContinue={handleContinue} />}
      </AnimatePresence>

      {started && <MusicControl isPlaying={isPlaying} onToggle={toggleMusic} />}

      {started && (
        <main className="relative z-10">
          <HeroSection />
          <CountdownSection />
          <ChildhoodSection />
          <EventDetailsSection />
          <GallerySection />
          <LocationSection />
          <FooterSection />
        </main>
      )}
    </>
  );
}
