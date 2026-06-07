"use client";

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicControl({ isPlaying, onToggle }: MusicControlProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-luxury-black/80 text-gold backdrop-blur-md transition-all hover:border-gold hover:shadow-gold sm:right-6 sm:top-6 sm:h-12 sm:w-12 pt-safe"
    >
      <div className={`flex items-end gap-0.5 ${!isPlaying ? "opacity-40" : ""}`}>
        {[6, 12, 8].map((h, i) => (
          <span
            key={i}
            className={`block w-[3px] rounded-full bg-gold ${isPlaying ? "animate-pulseGold" : ""}`}
            style={{ height: isPlaying ? h : 3, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </button>
  );
}
