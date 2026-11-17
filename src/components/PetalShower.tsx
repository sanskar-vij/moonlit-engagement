import { useMemo } from "react";

interface Petal {
  id: number;
  left: number;
  width: number;
  height: number;
  animationName: string;
  duration: number;
  delay: number;
  type: "white" | "ivory" | "blush" | "pink";
  opacity: number;
}

const TYPE_STYLES = {
  white: {
    background: "radial-gradient(ellipse at 35% 35%, #ffffff 0%, #fff1f6 50%, #f5d7e3 100%)",
  },
  ivory: {
    background: "radial-gradient(ellipse at 40% 40%, #ffffff 0%, #fef3f7 60%, #ecd3df 100%)",
  },
  blush: {
    background: "radial-gradient(ellipse at 30% 30%, #fff5f8 0%, #fbcfe8 50%, #f472b6 100%)",
  },
  pink: {
    background: "radial-gradient(ellipse at 30% 30%, #ffe4ec 0%, #f472b6 55%, #db2777 100%)",
  },
};

export default function PetalShower() {
  const petals = useMemo<Petal[]>(() => {
    const types: ("white" | "ivory" | "blush" | "pink")[] = [
      "white",
      "blush",
      "pink",
      "ivory",
      "blush",
      "white",
    ];
    const animations = ["petalDriftLeft", "petalDriftRight", "petalDriftFloat"];

    return Array.from({ length: 18 }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const r1 = seed / 233280;
      const r2 = (seed * 1.37) % 1;
      const r3 = (seed * 1.83) % 1;

      return {
        id: i,
        left: ((i * 5.5 + r1 * 4) % 94) + 3,
        width: 9 + Math.round(r2 * 6),
        height: 13 + Math.round(r3 * 8),
        animationName: animations[i % animations.length],
        duration: 8.5 + (i % 6) * 1.4,
        // Negative delay so petals are already mid-flight when the page opens
        delay: -((i * 1.35) % 14),
        type: types[i % types.length],
        opacity: 0.72 + (i % 4) * 0.08,
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden transform-gpu"
      aria-hidden="true"
    >
      {petals.map((petal) => {
        const style = TYPE_STYLES[petal.type];
        return (
          <span
            key={petal.id}
            className="pointer-events-none absolute"
            style={{
              left: `${petal.left}%`,
              top: "-25px",
              width: `${petal.width}px`,
              height: `${petal.height}px`,
              borderRadius: "65% 15% 65% 50%",
              opacity: petal.opacity,
              animationName: petal.animationName,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              willChange: "transform, opacity",
              contain: "layout style paint",
              ...style,
            }}
          />
        );
      })}
    </div>
  );
}
