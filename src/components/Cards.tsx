import { useEffect, useRef, useState, type ReactNode } from "react";
import coverBg from "../assets/cover_bg.webp";
import coverMoon from "../assets/cover_moon.webp";
import moonDisc from "../assets/moon_disc.webp";
import coverLanterns from "../assets/cover_lanterns.webp";
import coverFlowers from "../assets/cover_flowers.webp";
import coverCouple from "../assets/cover_couple.webp";
import coverCoupleOutline from "../assets/cover_couple_outline.webp";

import page2Bg from "../assets/page2_bg.webp";
import page2Arch from "../assets/page2_arch.webp";
import page2Stars from "../assets/page2_stars.webp";
import page2Roses from "../assets/page2_roses.webp";
import page2Boat from "../assets/page2_boat.webp";

import page3Bg from "../assets/page3_bg.webp";
import page3Lanterns from "../assets/page3_lanterns.webp";
import page3Flowers from "../assets/page3_flowers.webp";
import page3Terrace from "../assets/page3_terrace.webp";
import page3StoneLantern from "../assets/page3_stone_lantern.webp";

import {
  CalendarIcon,
  ClockIcon,
  FlourishDivider,
  Heart,
  HeartDivider,
  PinIcon,
  Plaque,
  Sparkles,
} from "./Ornaments";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ---------- Card 1 · Cover (The Proposal & Front Ceremony Event) ---------- */
export function CoverCard() {
  const { ref: revealRef, inView } = useReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [moonPos, setMoonPos] = useState({ x: 84.5, y: 10.1 });
  const [isDraggingMoon, setIsDraggingMoon] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMoonPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setIsDraggingMoon(true);
  };

  const handleMoonPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingMoon || !cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const rawX = ((clientX - rect.left) / rect.width) * 100;
      const rawY = ((clientY - rect.top) / rect.height) * 100;
      // Keep moon smoothly within the open night sky area
      const clampedX = Math.max(14, Math.min(90, rawX));
      const clampedY = Math.max(4, Math.min(38, rawY));
      setMoonPos({ x: clampedX, y: clampedY });
    });
  };

  const handleMoonPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingMoon) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch { }
      setIsDraggingMoon(false);
    }
  };

  return (
    <article
      ref={(node) => {
        (cardRef as any).current = node;
        (revealRef as any).current = node;
      }}
      aria-label="Together Forever – Ansh & Rini Engagement Ceremony"
      className="@container relative aspect-[9/16] w-full overflow-hidden bg-[#081330] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] ring-1 ring-[#cfd6e6]/55 select-none transform-gpu"
    >
      {/* Layer 1: Base Night Sky, Horizon & Lake Reflection */}
      <img
        src={coverBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transform-gpu"
      />

      <Sparkles seed={1} count={12} />

      {/* Moonlight reflection on lake water - dynamically tracks Moon X position! */}
      <span
        style={{ left: `${moonPos.x}%` }}
        className="water-glimmer pointer-events-none absolute top-[82%] h-[6.5cqw] w-[24cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,230,140,0.55)_0%,rgba(255,190,80,0.22)_50%,transparent_75%)] blur-md z-[1] transition-[left] duration-75"
        aria-hidden="true"
      />

      {/* Layer 2: Draggable Glowing Animated Moon & Concentric Lunar Aura */}
      <div
        onPointerDown={handleMoonPointerDown}
        onPointerMove={handleMoonPointerMove}
        onPointerUp={handleMoonPointerUp}
        onPointerCancel={handleMoonPointerUp}
        role="slider"
        aria-label="Drag Moon Across Sky"
        aria-valuemin={14}
        aria-valuemax={90}
        aria-valuenow={Math.round(moonPos.x)}
        tabIndex={0}
        style={{
          left: `${moonPos.x}%`,
          top: `${moonPos.y}%`,
        }}
        className={`group/moon absolute h-[20cqw] w-[20cqw] -translate-x-1/2 -translate-y-1/2 z-[2] touch-none select-none transition-shadow ${isDraggingMoon ? "cursor-grabbing scale-105" : "cursor-grab hover:scale-105"
          }`}
      >
        {/* Concentric Lunar Aura directly aligned to back of moon (Soft & Dimmed) */}
        <span
          className="smooth-lunar-aura pointer-events-none absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,248,205,0.45)_0%,rgba(255,215,120,0.22)_35%,rgba(255,180,60,0.06)_65%,transparent_78%)] blur-md"
        />
        <span
          className="smooth-lunar-aura pointer-events-none absolute inset-[-55%] rounded-full bg-[radial-gradient(circle,rgba(255,230,120,0.15)_0%,rgba(255,180,50,0.03)_50%,transparent_75%)] blur-lg [animation-delay:1.5s]"
        />

        {/* Moon Disc Shimmer & Image (Soft Natural Radiance) */}
        <div className="moon-shimmer pointer-events-none relative h-full w-full">
          <img
            src={moonDisc}
            alt="Glowing Full Moon"
            className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(255,230,150,0.4)]"
          />
        </div>

        {/* Drag Hint Tooltip */}
        <div className="pointer-events-none absolute -bottom-[4cqw] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#fde047]/40 bg-[#071333]/85 px-[2cqw] py-[0.4cqw] opacity-0 shadow-[0_0_10px_rgba(253,224,71,0.3)] backdrop-blur-sm transition-opacity duration-300 group-hover/moon:opacity-100">
          <span className="font-serif text-[1.8cqw] font-medium tracking-wider text-[#fde047]">
            🌕 DRAG MOON
          </span>
        </div>
      </div>

      {/* Layer 3: Hanging Lanterns with Animated Candle Flames & Unified Natural Canopy Sway */}
      <div className="canopy-sway-left pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
        {/* Lantern 1 Glow & Halo (Upper Lantern flame centroid: 15.3%, 20.6%) */}
        <span className="lantern-halo left-[15.3%] top-[20.6%] h-[11cqw] w-[11cqw] [animation-delay:0.3s]" />
        <span className="lantern-glow left-[15.3%] top-[20.6%] h-[5cqw] w-[4.5cqw] [animation-delay:0.3s]" />

        {/* Lantern 2 Glow & Halo (Lower Lantern flame centroid: 5.0%, 29.4%) */}
        <span className="lantern-halo left-[5.0%] top-[29.4%] h-[10cqw] w-[10cqw] [animation-delay:1.1s]" />
        <span className="lantern-glow left-[5.0%] top-[29.4%] h-[4.5cqw] w-[4cqw] [animation-delay:1.1s]" />

        {/* Hanging Lanterns Layer with Warm Light Glow */}
        <img
          src={coverLanterns}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transform-gpu lamp-light-glow"
        />

        {/* Cherry Blossom Floral Branch Layer (Swinging in 100% lockstep with lanterns) */}
        <img
          src={coverFlowers}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transform-gpu"
        />
      </div>

      {/* Layer 5: Proposal Silhouette Couple with Still Golden Border / Contour Glow */}
      <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        {/* Dedicated Golden Contour Glow Outline Layer (Still Couple Border Glow) */}
        <img
          src={coverCoupleOutline}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover couple-outline-glow transform-gpu"
        />

        {/* Silhouette Couple Image with Still Golden Edge Glow */}
        <img
          src={coverCouple}
          alt="Ansh proposing to Rini under the moonlit sky"
          className="h-full w-full object-cover transform-gpu couple-mode-gold"
        />
      </div>

      {/* Gentle vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-[radial-gradient(ellipse_at_50%_42%,rgba(6,14,38,0.55)_0%,rgba(6,14,38,0.15)_45%,transparent_70%)]" />

      {/* Inner hairline frame */}
      <div className="pointer-events-none absolute inset-[1.6cqw] z-[7] border border-[#e3c78f]/20" />

      {/* Foreground Content */}
      <div className={`reveal ${inView ? "in" : ""} pointer-events-none absolute inset-x-0 top-[20%] z-10 flex flex-col items-center text-center`}>
        <p className="font-serif text-[4.8cqw] font-medium italic tracking-[0.05em] whitespace-nowrap gold-text">
          Together Forever
        </p>
        <HeartDivider className="mt-[3cqw]" />
        <h1 className="mt-[3cqw] px-[1cqw] py-[1cqw] font-script text-[11.5cqw] leading-[1.2] whitespace-nowrap gold-script">
          Ansh &amp; Rini
        </h1>
        <p className="mt-[3.5cqw] font-serif text-[4.4cqw] font-medium uppercase tracking-[0.1em] gold-text">
          Engagement Ceremony
        </p>
      </div>
    </article>
  );
}

/* ---------- Card 2 · Details (The Ceremony Events: Date, Time & Venue) ---------- */
const CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ansh%20%26%20Rini%20Engagement%20Ceremony&dates=20271120T133000Z/20271120T183000Z&location=The%20Palm%20Pavilion%2C%20Goa&details=Your%20presence%20will%20make%20our%20joy%20complete.";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=The+Palm+Pavilion+Goa";

export function DetailsCard() {
  const { ref, inView } = useReveal<HTMLDivElement>();


  return (
    <article
      ref={ref}
      aria-label="Engagement Ceremony Events and Details"
      className="@container relative aspect-[9/16] w-full overflow-hidden bg-[#081330] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] ring-1 ring-[#cfd6e6]/55 transform-gpu"
    >
      {/* Layer 1: Base Night Sea, Clouds & Horizon */}
      <img
        src={page2Bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transform-gpu"
      />

      <Sparkles seed={2} count={12} />

      {/* Layer 2: Animated Glowing Moon & Moonlight Water Reflection Trail */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        {/* Concentric Lunar Aura directly behind moon (Soft & Dimmed) */}
        <span
          className="smooth-lunar-aura pointer-events-none absolute left-[78.8%] top-[69%] h-[24cqw] w-[24cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,245,200,0.45)_0%,rgba(255,215,120,0.22)_35%,rgba(255,175,50,0.06)_65%,transparent_80%)] blur-md"
        />
        <span
          className="smooth-lunar-aura pointer-events-none absolute left-[78.8%] top-[69%] h-[34cqw] w-[34cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,230,120,0.14)_0%,rgba(255,180,50,0.03)_50%,transparent_75%)] blur-lg [animation-delay:1.5s]"
        />
        {/* Moonlight Water Reflection Trail */}
        <span
          className="water-glimmer absolute left-[80.5%] top-[81%] h-[7cqw] w-[26cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,230,140,0.45)_0%,rgba(255,190,80,0.15)_50%,transparent_75%)] blur-md"
        />
      </div>

      {/* Layer 3: Sailboat Gently Bobbing on the Moonlit Water */}
      <div className="sailboat-bob pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <img
          src={page2Boat}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Layer 4: Golden Celestial Star Arch */}
      <img
        src={page2Arch}
        alt=""
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full object-cover"
      />

      {/* Layer 5: Chandelier Hanging Star Drops with Animated Starlight Glints */}
      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden="true">
        {/* Star glint at upper star */}
        <span className="star-flare pointer-events-none absolute left-[10.4%] top-[17.1%] h-[6cqw] w-[6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffeaad]/40 blur-[2px]" />
        {/* Star glint at lower star */}
        <span className="star-flare pointer-events-none absolute left-[13.6%] top-[29.1%] h-[7cqw] w-[7cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffeaad]/40 blur-[2px] [animation-delay:1.2s]" />
      </div>
      <img
        src={page2Stars}
        alt=""
        className="pointer-events-none absolute inset-0 z-[4] h-full w-full object-cover"
      />

      {/* Layer 6: White Roses Floral Corner Framing Top-Right with Soft Breeze Sway */}
      <div className="flower-sway-right pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        <img
          src={page2Roses}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Gentle vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-[radial-gradient(ellipse_at_50%_44%,rgba(6,14,38,0.58)_0%,rgba(6,14,38,0.15)_50%,transparent_74%)]" />

      {/* Inner hairline frame */}
      <div className="pointer-events-none absolute inset-[1.6cqw] z-[7] border border-[#e3c78f]/20" />

      {/* Foreground Content: Animated Events */}
      <div className={`reveal ${inView ? "in" : ""} absolute inset-x-[6cqw] top-[14%] z-10 flex flex-col items-center text-center`}>
        <p className="font-serif text-[4.3cqw] leading-[1.35] text-[#ecd5a3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          We are delighted to invite you to
          <br />
          the Engagement Ceremony of
        </p>

        <h2 className="mt-[2cqw] px-[1cqw] py-[0.5cqw] font-script text-[11.8cqw] leading-[1.1] whitespace-nowrap gold-script">
          Ansh &amp; Rini
        </h2>

        <FlourishDivider className="mt-[2cqw]" />

        <p className="mt-[1.5cqw] font-serif text-[4cqw] uppercase tracking-[0.2em] text-[#ecd5a3]/90">
          Events &amp; Schedule
        </p>

        {/* ================= ANIMATED EVENT BADGES ================= */}
        <div className="mt-[2.5cqw] flex w-full max-w-[340px] flex-col items-stretch gap-[2.4cqw]">

          {/* EVENT 1: Date with Animated Pulse & Google Calendar Integration */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Add Ceremony Date 20 November 2027 to Google Calendar"
            title="Add to Google Calendar"
            className="group/badge event-badge-glow flex items-center justify-between rounded-2xl border border-[#e3c78f]/40 bg-[#071333]/85 px-[4.5cqw] py-[2.4cqw] text-left transition-all duration-300 hover:scale-[1.03] active:scale-95"
          >
            <div className="flex items-center gap-[3.2cqw]">
              <span className="flex h-[9.5cqw] w-[9.5cqw] items-center justify-center rounded-xl border border-[#ecd5a3]/50 bg-[#122554]/90 shadow-[0_0_12px_rgba(236,213,163,0.3)]">
                <CalendarIcon className="w-[5.2cqw] calendar-pulse text-[#ecd5a3]" />
              </span>
              <div>
                <p className="font-serif text-[2.4cqw] font-semibold uppercase tracking-[0.16em] text-[#edd9b2]/80">
                  Ceremony Date
                </p>
                <p className="font-serif text-[4.4cqw] font-bold tracking-wider text-[#fff4df] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  20 NOVEMBER 2027
                </p>
              </div>
            </div>
            <span className="font-serif text-[2.6cqw] font-medium italic text-[#ecd5a3] opacity-80 transition group-hover/badge:opacity-100 group-hover/badge:translate-x-1">
              + Save
            </span>
          </a>

          {/* EVENT 2: Time with Animated Clock Tick Hand */}
          <div className="event-badge-glow flex items-center rounded-2xl border border-[#e3c78f]/40 bg-[#071333]/85 px-[4.5cqw] py-[2.4cqw] text-left [animation-delay:1.3s]">
            <div className="flex items-center gap-[3.2cqw]">
              <span className="flex h-[9.5cqw] w-[9.5cqw] items-center justify-center rounded-xl border border-[#ecd5a3]/50 bg-[#122554]/90 shadow-[0_0_12px_rgba(236,213,163,0.3)]">
                <ClockIcon className="w-[5.2cqw] clock-tick text-[#ecd5a3]" />
              </span>
              <div>
                <p className="font-serif text-[2.4cqw] font-semibold uppercase tracking-[0.16em] text-[#edd9b2]/80">
                  Evening Soirée
                </p>
                <p className="font-serif text-[4.4cqw] font-bold tracking-wide text-[#fff4df] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  7:00 PM Onwards
                </p>
              </div>
            </div>
          </div>

          {/* EVENT 3: Venue with Animated Pin Bounce & Google Maps Navigation */}
          <a
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open The Palm Pavilion Goa venue in Google Maps"
            title="Open in Google Maps"
            className="group/badge event-badge-glow flex items-center justify-between rounded-2xl border border-[#e3c78f]/40 bg-[#071333]/85 px-[4.5cqw] py-[2.4cqw] text-left transition-all duration-300 hover:scale-[1.03] active:scale-95 [animation-delay:2.6s]"
          >
            <div className="flex items-center gap-[3.2cqw]">
              <span className="flex h-[9.5cqw] w-[9.5cqw] items-center justify-center rounded-xl border border-[#ecd5a3]/50 bg-[#122554]/90 shadow-[0_0_12px_rgba(236,213,163,0.3)]">
                <PinIcon className="w-[5.2cqw] pin-bounce text-[#ecd5a3]" />
              </span>
              <div>
                <p className="font-serif text-[2.4cqw] font-semibold uppercase tracking-[0.16em] text-[#edd9b2]/80">
                  Ceremony Venue
                </p>
                <p className="font-serif text-[4.2cqw] font-bold leading-tight tracking-wide text-[#fff4df] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  The Palm Pavilion, Goa
                </p>
              </div>
            </div>
            <span className="font-serif text-[2.6cqw] font-medium italic text-[#ecd5a3] opacity-80 transition group-hover/badge:opacity-100 group-hover/badge:translate-x-1">
              Maps ↗
            </span>
          </a>

        </div>

        <FlourishDivider className="mt-[2.5cqw]" />

        <p className="mt-[1.8cqw] font-serif text-[4.2cqw] italic leading-[1.35] text-[#fff4df] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Your presence will make
          <br />
          our joy complete.
        </p>

        <Heart className="mt-[1.8cqw] w-[3.6cqw] heart-pulse text-[#ecd5a3] drop-shadow-[0_0_8px_rgba(236,213,163,0.8)]" />
      </div>
    </article>
  );
}

/* ---------- Card 3 · Closing (The Celebration & RSVP Event) ---------- */
export function ClosingCard({ onRsvp }: { onRsvp: () => void }) {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      aria-label="A New Chapter Begins – RSVP Ceremony Event"
      className="@container relative aspect-[9/16] w-full overflow-hidden bg-[#081330] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] ring-1 ring-[#cfd6e6]/55 transform-gpu"
    >
      {/* Layer 1: Base Coastal Night Harbor Skyline */}
      <img
        src={page3Bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transform-gpu"
      />

      <Sparkles seed={3} count={12} />

      {/* Water reflection glimmer along coastal harbor lights */}
      <span
        className="water-glimmer pointer-events-none absolute left-[70%] top-[74%] h-[8cqw] w-[35cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fde047]/20 blur-md"
        aria-hidden="true"
      />

      {/* Layer 2: 3 Hanging Lanterns with Synchronized Candle Flame Glows & Night Breeze Sway */}
      <div className="lantern-sway-right pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
        {/* Lantern 1 (left) */}
        <span className="lantern-halo left-[68.6%] top-[11.3%] h-[12cqw] w-[12cqw] [animation-delay:0.4s]" />
        <span className="lantern-glow left-[68.6%] top-[11.3%] h-[5.5cqw] w-[4.5cqw] [animation-delay:0.4s]" />

        {/* Lantern 2 (middle) */}
        <span className="lantern-halo left-[79.2%] top-[15.3%] h-[13cqw] w-[13cqw] [animation-delay:1.3s]" />
        <span className="lantern-glow left-[79.2%] top-[15.3%] h-[6.5cqw] w-[5.5cqw] [animation-delay:1.3s]" />

        {/* Lantern 3 (closest right) */}
        <span className="lantern-halo left-[90.5%] top-[18.4%] h-[15cqw] w-[15cqw] [animation-delay:0.8s]" />
        <span className="lantern-glow left-[90.5%] top-[18.4%] h-[8cqw] w-[6.5cqw] [animation-delay:0.8s]" />

        <img
          src={page3Lanterns}
          alt=""
          className="absolute inset-0 h-full w-full object-cover lamp-light-glow"
        />
      </div>

      {/* Layer 3: Cherry Blossom Floral Branch in Top-Left Corner with Breeze Sway */}
      <div className="flower-sway-left pointer-events-none absolute inset-0 z-[4]" aria-hidden="true">
        <img
          src={page3Flowers}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Layer 4: Stone Terrace Balustrade & Flower Bushes at Bottom-Left with Gentle Breeze Rustle */}
      <div className="terrace-rustle pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
        <img
          src={page3Terrace}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Layer 5: Stone Lantern with Living Firelight Flame & Ambient Step Illumination */}
      <div className="pointer-events-none absolute inset-0 z-[6]" aria-hidden="true">
        <span className="stone-lantern-light left-[16.8%] top-[83.9%] h-[24cqw] w-[24cqw] rounded-full bg-gradient-to-r from-[#ffaa33]/25 via-[#ffcc55]/35 to-transparent blur-md" />
        <span className="lantern-halo left-[16.8%] top-[83.9%] h-[18cqw] w-[18cqw] [animation-delay:0.5s]" />
        <span className="stone-flame left-[16.8%] top-[83.9%] h-[8.5cqw] w-[7cqw] rounded-full bg-gradient-to-t from-[#ff8c1a] via-[#ffeaad] to-[#ffffff] blur-[2px] shadow-[0_0_15px_rgba(255,200,80,0.9)]" />
      </div>
      <img
        src={page3StoneLantern}
        alt=""
        className="pointer-events-none absolute inset-0 z-[7] h-full w-full object-cover lamp-light-glow"
      />

      {/* Gentle vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(ellipse_at_50%_38%,rgba(6,14,38,0.58)_0%,rgba(6,14,38,0.18)_50%,transparent_75%)]" />

      {/* Inner hairline frame */}
      <div className="pointer-events-none absolute inset-[1.6cqw] z-[9] border border-[#e3c78f]/20" />

      {/* Foreground Content */}
      <div className={`reveal ${inView ? "in" : ""} absolute inset-x-[8%] top-[26%] z-10 flex flex-col items-center text-center`}>
        <h2 className="font-script text-[12cqw] leading-[1.05] gold-script">
          A New Chapter
          <br />
          Begins…
        </h2>

        <HeartDivider className="mt-[2.5cqw]" />

        <p className="mt-[2.5cqw] font-serif text-[4.6cqw] italic leading-[1.4] text-[#fff4df] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Join Us in Celebrating
          <br />
          Love, Togetherness and Forever.
        </p>

        <FlourishDivider className="mt-[3cqw]" />

        <p className="mt-[2.5cqw] font-serif text-[4.2cqw] italic text-[#edd9b2]">
          With Love,
        </p>
        <p className="mt-[0.5cqw] font-script text-[9.5cqw] leading-tight gold-script">
          Ansh &amp; Rini
        </p>

        {/* Animated RSVP Event Button with Sheen Sweep */}
        <button
          onClick={onRsvp}
          aria-label="RSVP by 15 November 2027"
          className="group relative mt-[3.5cqw] overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.05] active:scale-95"
        >
          <Plaque>
            <div className="flex flex-col items-center px-[9cqw] py-[2.6cqw]">
              <span className="flex items-center gap-[2cqw] font-serif text-[5.2cqw] font-semibold tracking-[0.14em] text-[#fff2d4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                RSVP
                <span className="text-[3.2cqw] text-[#ecd5a3]">💌</span>
              </span>
              <span className="mt-[0.4cqw] font-serif text-[3.2cqw] italic text-[#ecd5a3]/90">
                by 15 November 2027
              </span>
            </div>
          </Plaque>
          <Heart className="mx-auto -mt-[1.6cqw] w-[3.2cqw] heart-pulse relative text-[#ecd5a3]" />
        </button>

      </div>
    </article>
  );
}