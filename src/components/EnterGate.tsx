import { useEffect, useRef, useState, type PointerEvent, type MouseEvent } from "react";
import page2Bg from "../assets/page2_bg.webp";
import page2Stars from "../assets/page2_stars.webp";
import moonDisc from "../assets/moon_disc.webp";
import { FlourishDivider, Heart, HeartDivider, Sparkles, StarCross } from "./Ornaments";

interface EnterGateProps {
  onEnter: () => void;
}

export default function EnterGate({ onEnter }: EnterGateProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const startPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const isUnlockedRef = useRef<boolean>(false);

  const handleUnlock = () => {
    if (isUnlockedRef.current || isExiting) return;
    isUnlockedRef.current = true;
    setIsUnlocked(true);

    // Synchronously trigger music within user gesture
    try {
      onEnter();
    } catch (err) {
      console.warn("Audio trigger error:", err);
    }

    // Allow celebratory celestial burst to bloom before fadeout
    setTimeout(() => {
      setIsExiting(true);
    }, 700);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isUnlockedRef.current || isExiting) return;
    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    startOffsetRef.current = { ...dragOffset };

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || isUnlockedRef.current) return;
    e.preventDefault();

    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;
    const newX = startOffsetRef.current.x + dx;
    const newY = startOffsetRef.current.y + dy;
    setDragOffset({ x: newX, y: newY });

    // If dragged past 70px in any direction, automatically trigger unlock!
    const distance = Math.hypot(newX, newY);
    if (distance >= 70) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      handleUnlock();
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const distance = Math.hypot(dragOffset.x, dragOffset.y);
    if (distance >= 40) {
      handleUnlock();
    } else {
      // Smooth organic spring back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Water reflection on lake tracks moon horizontal movement
  const waterReflectionX = 50 + dragOffset.x * 0.18;

  return (
    <div
      onMouseMove={handleMouseMove}
      aria-label="Ansh & Rini Engagement - Move the moon to enter"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#030617]/98 p-3 sm:p-6 select-none transition-all duration-700 ease-out transform-gpu ${
        isExiting
          ? "opacity-0 scale-[1.05] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient cursor / touch glow */}
      <div
        className="pointer-events-none absolute -inset-20 opacity-35 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(253, 224, 71, 0.18), transparent 75%), radial-gradient(ellipse at 50% 50%, #15265a 0%, transparent 80%)`,
        }}
      />

      {/* Floating Golden Embers in Ambient Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="firefly-drift absolute left-[15%] top-[85%] h-1.5 w-1.5 rounded-full bg-[#fde047]/60 blur-[0.5px]" />
        <span className="firefly-drift absolute left-[30%] top-[90%] h-2 w-2 rounded-full bg-[#ecd5a3]/70 blur-[0.5px] [animation-delay:3s]" />
        <span className="firefly-drift absolute left-[75%] top-[80%] h-1.5 w-1.5 rounded-full bg-[#ffd700]/60 blur-[0.5px] [animation-delay:6s]" />
        <span className="firefly-drift absolute left-[85%] top-[88%] h-2 w-2 rounded-full bg-[#ecd5a3]/80 blur-[0.5px] [animation-delay:1.5s]" />
      </div>

      {/* ================= ROYAL THEMED GATEWAY CARD ================= */}
      <div className="@container relative aspect-[9/16] w-full max-w-[420px] max-h-[94svh] overflow-hidden rounded-3xl border-2 border-[#d4af37]/80 bg-[#081330] shadow-[0_25px_90px_rgba(0,0,0,0.98),0_0_60px_rgba(217,186,119,0.3)] ring-1 ring-[#ecd5a3]/50 transform-gpu">
        
        {/* Layer 1: Clean Starlit Twilight Seascape (Changed BG - Serene & Clutter-Free) */}
        <img
          src={page2Bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transform-gpu"
        />

        {/* Twinkling Constellation Stars Layer */}
        <img
          src={page2Stars}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80"
          aria-hidden="true"
        />
        <Sparkles seed={1} count={16} />

        {/* Dynamic Moonlight Reflection on Ocean (Tracks Moon Drag Movement) */}
        <span
          style={{ left: `${waterReflectionX}%` }}
          className="water-glimmer pointer-events-none absolute top-[85%] h-[9cqw] w-[34cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,235,150,0.65)_0%,rgba(255,190,80,0.25)_50%,transparent_75%)] blur-md z-[1] transition-[left] duration-75"
          aria-hidden="true"
        />

        {/* Gentle vignette for legibility */}
        <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_50%_48%,rgba(6,14,38,0.52)_0%,rgba(6,14,38,0.18)_50%,transparent_75%)]" />

        {/* Inner Dual Golden Hairline Frame */}
        <div className="pointer-events-none absolute inset-[2cqw] z-[5] rounded-[20px] border border-[#d4af37]/40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-[3cqw] z-[5] rounded-[18px] border border-[#ecd5a3]/20" aria-hidden="true" />

        {/* 4 Ornate Filigree Corner Accents */}
        <div className="pointer-events-none absolute inset-[2cqw] z-[5]" aria-hidden="true">
          {/* Top-Left */}
          <svg className="absolute left-[1.2cqw] top-[1.2cqw] w-[6.5cqw] text-[#ecd5a3]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 18V2H18M2 2l12 12M6 2c0 8 6 14 14 14" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
          {/* Top-Right */}
          <svg className="absolute right-[1.2cqw] top-[1.2cqw] w-[6.5cqw] -scale-x-100 text-[#ecd5a3]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 18V2H18M2 2l12 12M6 2c0 8 6 14 14 14" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
          {/* Bottom-Left */}
          <svg className="absolute left-[1.2cqw] bottom-[1.2cqw] w-[6.5cqw] -scale-y-100 text-[#ecd5a3]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 18V2H18M2 2l12 12M6 2c0 8 6 14 14 14" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
          {/* Bottom-Right */}
          <svg className="absolute right-[1.2cqw] bottom-[1.2cqw] w-[6.5cqw] -scale-100 text-[#ecd5a3]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 18V2H18M2 2l12 12M6 2c0 8 6 14 14 14" />
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* ================= CARD FOREGROUND CONTENT ================= */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-[5.5cqw] py-[6cqw] text-center">
          
          {/* TOP SECTION: Together Forever & Couple Names */}
          <div className="flex flex-col items-center">
            {/* Crown Star Flourish */}
            <div className="flex items-center gap-[2.5cqw]">
              <span className="h-px w-[14cqw] bg-gradient-to-r from-transparent via-[#e3c78f] to-[#e3c78f]" />
              <StarCross className="w-[3cqw] text-[#ecd5a3] drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
              <span className="h-px w-[14cqw] bg-gradient-to-l from-transparent via-[#e3c78f] to-[#e3c78f]" />
            </div>

            <p className="mt-[2cqw] font-serif text-[4.4cqw] font-medium italic tracking-[0.05em] whitespace-nowrap gold-text">
              Together Forever
            </p>

            <h1 className="mt-[1.5cqw] px-[1cqw] font-script text-[14cqw] leading-[1.05] whitespace-nowrap gold-script drop-shadow-[0_2px_14px_rgba(236,213,163,0.5)]">
              Ansh &amp; Rini
            </h1>

            <FlourishDivider className="mt-[1.8cqw]" />

            <p className="mt-[1.2cqw] font-serif text-[3.8cqw] font-medium uppercase tracking-[0.16em] gold-text">
              Engagement Ceremony
            </p>
          </div>

          {/* ================= MIDDLE SECTION: THE BIG DRAGGABLE MOON IN THE CENTER ================= */}
          <div className="relative my-auto flex items-center justify-center">

            {/* THE BIG DRAGGABLE MOON (Glow Aligned Directly to the Back of the Moon) */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClick={handleUnlock}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
                  e.preventDefault();
                  handleUnlock();
                }
              }}
              role="slider"
              aria-label="Drag the Moon to Enter"
              tabIndex={0}
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
                transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)",
              }}
              className={`group/bigmoon relative z-20 flex h-[46cqw] w-[46cqw] touch-none select-none items-center justify-center rounded-full cursor-grab active:cursor-grabbing outline-none focus:outline-none focus:ring-0 ${
                isDragging ? "scale-108" : "hover:scale-105"
              }`}
            >
              {/* ALIGNED SOOTHING GLOW DIRECTLY IN THE BACK OF THE MOON (Subtly Dimmed & Elegant) */}
              <div className="smooth-lunar-aura pointer-events-none absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,248,205,0.45)_0%,rgba(253,224,71,0.22)_35%,rgba(253,224,71,0.06)_65%,transparent_78%)] blur-lg -z-10" />
              <div className="smooth-lunar-aura pointer-events-none absolute inset-[-55%] rounded-full bg-[radial-gradient(circle,rgba(255,230,120,0.16)_0%,rgba(253,224,71,0.04)_50%,transparent_75%)] blur-xl [animation-delay:1.5s] -z-10" />

              {/* Concentric Celestial Orbit Rings (Soft & Dimmed) */}
              <div className="smooth-orbit-ring pointer-events-none absolute inset-[-10%] rounded-full border border-[#fde047]/22 shadow-[0_0_14px_rgba(253,224,71,0.15)] -z-10" />
              <div className="smooth-orbit-ring pointer-events-none absolute inset-[-18%] rounded-full border border-[#ecd5a3]/12 [animation-delay:1.2s] -z-10" />

              {/* Celebratory Starlight Burst when unlocked */}
              {isUnlocked && (
                <div className="celestial-burst pointer-events-none absolute inset-[-35%] rounded-full bg-[radial-gradient(circle,rgba(255,255,240,1)_0%,rgba(253,224,71,0.85)_40%,transparent_70%)] z-30" />
              )}

              {/* Moon Shimmer & Disc Image (Soft Natural Radiance) */}
              <div className="moon-shimmer relative h-full w-full pointer-events-none">
                <img
                  src={moonDisc}
                  alt="Glowing Full Moon"
                  className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(255,230,160,0.45)] drop-shadow-[0_0_24px_rgba(255,200,80,0.22)]"
                />
              </div>

              {/* Gentle Floating Hint Badge */}
              <div
                style={{ opacity: isDragging || isUnlocked ? 0 : 1 }}
                className="pointer-events-none absolute -bottom-[4.5cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#fde047]/60 bg-[#071333]/90 px-[3cqw] py-[0.6cqw] shadow-[0_0_15px_rgba(253,224,71,0.4)] backdrop-blur-sm transition-opacity duration-300"
              >
                <span className="font-serif text-[2.8cqw] font-semibold tracking-wider text-[#fde047]">
                  ✦ DRAG MOON TO ENTER ✦
                </span>
              </div>
            </div>

          </div>

          {/* ================= BOTTOM SECTION: MUSIC HINT & DATE ================= */}
          <div className="flex w-full flex-col items-center">
            
            {/* Equalizer Wave with Melodic Prompt */}
            <div className="flex items-center justify-center gap-[1.5cqw]">
              <span className="flex h-[2.6cqw] items-end gap-[0.4cqw]" aria-hidden="true">
                <span className="h-[1.8cqw] w-[0.4cqw] animate-pulse rounded-full bg-[#ecd5a3]" />
                <span className="h-[2.6cqw] w-[0.4cqw] animate-pulse rounded-full bg-[#ecd5a3] [animation-delay:0.2s]" />
                <span className="h-[1.4cqw] w-[0.4cqw] animate-pulse rounded-full bg-[#ecd5a3] [animation-delay:0.4s]" />
              </span>

              <span className="font-serif text-[3.2cqw] font-medium italic text-[#ecd5a3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                Move the moon to begin with romantic melody
              </span>
            </div>

            {/* Direct Tap Link Fallback */}
            <button
              onClick={handleUnlock}
              type="button"
              className="mt-[1cqw] font-serif text-[2.8cqw] italic text-[#edd9b2]/75 hover:text-[#fde047] active:scale-95 transition underline underline-offset-4 decoration-[#edd9b2]/40"
            >
              (or tap moon to open)
            </button>

            <HeartDivider className="mt-[2cqw]" />

            {/* Date & Location Footer */}
            <p className="mt-[1cqw] font-serif text-[3cqw] font-semibold uppercase tracking-[0.2em] text-[#ecd5a3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              20 NOVEMBER 2027 · GOA, INDIA
            </p>

            <Heart className="mx-auto mt-[0.8cqw] w-[2.8cqw] heart-pulse text-[#ecd5a3]" />
          </div>

        </div>
      </div>
    </div>
  );
}
