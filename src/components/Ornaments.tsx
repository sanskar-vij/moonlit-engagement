import type { ReactNode } from "react";

const GOLD = "#e3c78f";

export function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={className} fill={GOLD} aria-hidden>
      <path d="M12 21.5 10.4 20C4.6 14.8 1 11.5 1 7.4 1 4 3.6 1.5 7 1.5c1.9 0 3.7.9 5 2.3 1.3-1.4 3.1-2.3 5-2.3 3.4 0 6 2.5 6 5.9 0 4.1-3.6 7.4-9.4 12.6L12 21.5Z" />
    </svg>
  );
}

/** line — heart — line */
export function HeartDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[2.5cqw] ${className}`}>
      <span className="h-px w-[22cqw] bg-gradient-to-r from-transparent via-[#e3c78f] to-[#e3c78f]" />
      <span className="h-[0.5cqw] w-[0.5cqw] rotate-45 bg-[#e3c78f]" />
      <Heart className="w-[3.6cqw] heart-pulse drop-shadow-[0_0_6px_rgba(236,213,163,0.6)]" />
      <span className="h-[0.5cqw] w-[0.5cqw] rotate-45 bg-[#e3c78f]" />
      <span className="h-px w-[22cqw] bg-gradient-to-l from-transparent via-[#e3c78f] to-[#e3c78f]" />
    </div>
  );
}

/** line — filigree flourish — line */
export function FlourishDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-[2cqw] ${className}`}>
      <span className="h-px w-[20cqw] bg-gradient-to-r from-transparent to-[#e3c78f]" />
      <svg viewBox="0 0 60 16" className="w-[9cqw]" fill="none" stroke={GOLD} strokeWidth="1.1" aria-hidden>
        <path d="M30 3c2 2.2 2 4.8 0 7-2-2.2-2-4.8 0-7Z" fill={GOLD} />
        <path d="M27 8c-3-3.5-8-3.5-10 0 2 3.5 7 3.5 10 0Z" />
        <path d="M33 8c3-3.5 8-3.5 10 0-2 3.5-7 3.5-10 0Z" />
        <path d="M17 8c-3 0-5 1.5-7 0M43 8c3 0 5 1.5 7 0" />
        <circle cx="5" cy="8" r="1.4" fill={GOLD} />
        <circle cx="55" cy="8" r="1.4" fill={GOLD} />
        <path d="M30 11v3" />
      </svg>
      <span className="h-px w-[20cqw] bg-gradient-to-l from-transparent to-[#e3c78f]" />
    </div>
  );
}

/** Ornate notched plaque frame (used for title banner & RSVP) */
export function Plaque({
  children,
  className = "",
  wings = false,
}: {
  children: ReactNode;
  className?: string;
  wings?: boolean;
}) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {wings && (
        <svg viewBox="0 0 40 24" className="absolute right-full mr-[-4px] w-8 sm:w-12" fill={GOLD} aria-hidden>
          <path d="M40 12 26 9c-4-1-6-5-9-6 1 3 3 5 6 7H0v4h23c-3 2-5 4-6 7 3-1 5-5 9-6l14-3Z" />
        </svg>
      )}
      <div className="relative">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="plaqueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0d1a3d" />
              <stop offset="1" stopColor="#060e26" />
            </linearGradient>
          </defs>
          <path
            d="M18 2H282L298 18V62L282 78H18L2 62V18Z"
            fill="url(#plaqueFill)"
            fillOpacity="0.92"
            stroke={GOLD}
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M22 7H278L292 21V59L278 73H22L8 59V21Z"
            fill="none"
            stroke={GOLD}
            strokeOpacity="0.7"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="relative overflow-hidden rounded-md">
          {children}
          {/* Gentle golden sheen sweep */}
          <span
            className="sheen-sweep pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#ffffff]/20 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
      {wings && (
        <svg viewBox="0 0 40 24" className="absolute left-full ml-[-4px] w-8 -scale-x-100 sm:w-12" fill={GOLD} aria-hidden>
          <path d="M40 12 26 9c-4-1-6-5-9-6 1 3 3 5 6 7H0v4h23c-3 2-5 4-6 7 3-1 5-5 9-6l14-3Z" />
        </svg>
      )}
    </div>
  );
}

export function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={GOLD} strokeWidth="1.5" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7 14h2M11 14h2M15 14h2M7 17h2M11 17h2" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={GOLD} strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={GOLD} aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

/** 4-pointed celestial diamond star cross */
export function StarCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

/** Rich celestial blinking starfield for card night skies (Mobile-optimized) */
export function Sparkles({ count = 12, seed = 1 }: { count?: number; seed?: number }) {
  const rand = (i: number) => {
    const x = Math.sin(i * 9301 + seed * 49297) * 233280;
    return x - Math.floor(x);
  };

  const anims = ["star-blink", "star-shimmer", "twinkle"];

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden transform-gpu">
      {/* Blinking celestial stars */}
      {Array.from({ length: count }).map((_, i) => {
        const size = 1.4 + rand(i + 100) * 2.2;
        const anim = anims[i % anims.length];
        const isWarm = rand(i + 20) > 0.45;
        return (
          <span
            key={`s-${i}`}
            className={`${anim} absolute rounded-full`}
            style={{
              left: `${4 + rand(i) * 92}%`,
              top: `${3 + rand(i + 50) * 62}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isWarm ? "#fff5dc" : "#eef6ff",
              animationDelay: `${rand(i + 150) * 4}s`,
              animationDuration: `${2.2 + rand(i + 200) * 2.4}s`,
            }}
          />
        );
      })}

      {/* 4-pointed bright celestial cross stars */}
      {[0, 1].map((idx) => {
        const xPos = 14 + rand(idx + 10) * 72;
        const yPos = 6 + rand(idx + 60) * 45;
        const starSize = 9 + rand(idx + 80) * 5;
        return (
          <span
            key={`flare-${idx}`}
            className="star-flare pointer-events-none absolute text-[#fff2d6]"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: `${starSize}px`,
              height: `${starSize}px`,
              animationDelay: `${rand(idx + 90) * 3.5}s`,
              animationDuration: `${3.6 + rand(idx + 120) * 1.8}s`,
            }}
          >
            <StarCross className="h-full w-full" />
          </span>
        );
      })}
    </div>
  );
}
