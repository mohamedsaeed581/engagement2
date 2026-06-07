"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  label,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative px-4 py-16 sm:px-6 sm:py-20 md:py-28 lg:px-12 lg:py-32 ${className}`}
    >
      {label && (
        <p className="mb-3 text-center font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/40 sm:mb-4 sm:text-[11px] sm:tracking-[0.35em]">
          {label}
        </p>
      )}
      {children}
    </section>
  );
}

export function GoldDivider() {
  return (
    <div className="mx-auto mb-8 flex max-w-xs items-center gap-4 sm:mb-10 sm:gap-5 md:mb-12">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <span className="text-sm text-gold/70">✦</span>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}

export function GoldButton({
  children,
  onClick,
  href,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const classes = `inline-block w-full max-w-xs border border-gold px-8 py-3 font-montserrat text-[10px] uppercase tracking-[0.25em] text-gold transition-all duration-400 hover:bg-gold hover:text-luxury-black hover:shadow-gold sm:w-auto sm:max-w-none sm:px-10 sm:py-3.5 sm:text-[11px] sm:tracking-[0.3em] ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
