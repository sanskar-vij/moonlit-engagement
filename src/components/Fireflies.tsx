import { useMemo } from "react";

interface Firefly {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Fireflies() {
  const fireflies = useMemo<Firefly[]>(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const seed = (i * 7919 + 49297) % 233280;
      const r1 = seed / 233280;
      const r2 = (seed * 1.57) % 1;

      return {
        id: i,
        left: ((i * 7.2 + r1 * 4) % 94) + 3,
        size: 3 + Math.round(r2 * 3.5),
        duration: 11 + (i % 5) * 1.8,
        delay: -((i * 1.7) % 13),
        opacity: 0.65 + (i % 3) * 0.15,
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden transform-gpu"
      aria-hidden="true"
    >
      {fireflies.map((f) => (
        <span
          key={`ff-${f.id}`}
          className="firefly-drift pointer-events-none absolute rounded-full"
          style={{
            left: `${f.left}%`,
            bottom: "-30px",
            width: `${f.size}px`,
            height: `${f.size}px`,
            background:
              "radial-gradient(circle, #fff9e6 0%, #ffe082 45%, rgba(255, 193, 7, 0.4) 75%, transparent 100%)",
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            contain: "layout style paint",
          }}
        />
      ))}
    </div>
  );
}
