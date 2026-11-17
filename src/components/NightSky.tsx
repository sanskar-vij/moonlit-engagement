import { useMemo } from "react";
import { StarCross } from "./Ornaments";

interface SkyStar {
  id: number;
  left: number;
  top: number;
  size: number;
  anim: "star-blink" | "star-shimmer" | "twinkle";
  delay: number;
  duration: number;
  isWarm: boolean;
}

interface SkyFlare {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

export default function NightSky() {
  const { stars, flares } = useMemo(() => {
    const starList: SkyStar[] = Array.from({ length: 24 }, (_, i) => {
      const seed = (i * 7919 + 31337) % 233280;
      const r1 = seed / 233280;
      const r2 = (seed * 1.41) % 1;
      const r3 = (seed * 1.73) % 1;
      const anims: ("star-blink" | "star-shimmer" | "twinkle")[] = [
        "star-blink",
        "star-shimmer",
        "star-blink",
        "twinkle",
      ];

      return {
        id: i,
        left: Math.round(((i * 4.1 + r1 * 4) % 94 + 3) * 10) / 10,
        top: Math.round(((i * 3.9 + r2 * 5) % 93 + 3) * 10) / 10,
        size: Math.round((1.5 + r3 * 2.0) * 10) / 10,
        anim: anims[i % anims.length],
        delay: Math.round(((i * 0.9) % 6) * 10) / 10,
        duration: Math.round((2.4 + (i % 4) * 0.8) * 10) / 10,
        isWarm: i % 3 === 0,
      };
    });

    const flareList: SkyFlare[] = [
      { id: 1, left: 14, top: 18, size: 12, delay: 0.5, duration: 4.2 },
      { id: 2, left: 86, top: 28, size: 13, delay: 1.8, duration: 4.8 },
      { id: 3, left: 12, top: 72, size: 11, delay: 2.7, duration: 3.9 },
    ];

    return { stars: starList, flares: flareList };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu"
      aria-hidden="true"
    >
      {/* Blinking celestial background stars */}
      {stars.map((star) => (
        <span
          key={`sky-s-${star.id}`}
          className={`${star.anim} pointer-events-none absolute rounded-full`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.isWarm ? "#fff4da" : "#eaf3ff",
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* 4-pointed diamond star flares ⭐ */}
      {flares.map((flare) => (
        <span
          key={`sky-flare-${flare.id}`}
          className="star-flare pointer-events-none absolute text-[#fff2d6]"
          style={{
            left: `${flare.left}%`,
            top: `${flare.top}%`,
            width: `${flare.size}px`,
            height: `${flare.size}px`,
            animationDelay: `${flare.delay}s`,
            animationDuration: `${flare.duration}s`,
          }}
        >
          <StarCross className="h-full w-full" />
        </span>
      ))}

      {/* Occasional shooting stars / meteors crossing the night sky */}
      <span
        className="shooting-star pointer-events-none"
        style={{
          top: "15%",
          right: "12%",
          width: "120px",
          animationDelay: "3s",
        }}
      />
      <span
        className="shooting-star pointer-events-none"
        style={{
          top: "38%",
          right: "28%",
          width: "90px",
          animationDelay: "9.5s",
          animationDuration: "16s",
        }}
      />
    </div>
  );
}
