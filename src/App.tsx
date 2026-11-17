import { useEffect, useRef, useState } from "react";
import songUrl from "./assets/song.mp3";
import { ClosingCard, CoverCard, DetailsCard } from "./components/Cards";
import EnterGate from "./components/EnterGate";
import Fireflies from "./components/Fireflies";
import NightSky from "./components/NightSky";
import PetalShower from "./components/PetalShower";
import RsvpModal from "./components/RsvpModal";
import SparkleTrail from "./components/SparkleTrail";

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingRef = useRef(false);

  // 1. Ensure the website always starts from the very beginning (top of page) on reload
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 2. Pause/stop audio when switching tabs, minimizing, or closing the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        // Tab changed or hidden: stop playing immediately
        if (!audio.paused) {
          wasPlayingRef.current = true;
          audio.pause();
          setIsPlaying(false);
        }
      } else {
        // Tab active again: resume only if it was playing when tab was hidden
        if (wasPlayingRef.current) {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    };

    const handlePageExit = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageExit);
    window.addEventListener("beforeunload", handlePageExit);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageExit);
      window.removeEventListener("beforeunload", handlePageExit);
    };
  }, []);

  const handleEnter = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked:", err);
        });
    }
    setTimeout(() => {
      setHasEntered(true);
    }, 1000);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      wasPlayingRef.current = false;
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          wasPlayingRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  return (
    <main className="min-h-svh px-3 pb-10 pt-6 sm:px-6 sm:pt-8">
      {/* Animated celestial night sky with blinking stars & shooting stars */}
      <NightSky />

      {/* Floating golden fairy dust fireflies rising gently */}
      <Fireflies />

      {/* Full-website romantic white and pink petal shower */}
      <PetalShower />

      {/* Interactive touch & cursor fairy dust sparkle trail */}
      <SparkleTrail />

      {/* Tap to Enter royal welcome gate */}
      {!hasEntered && <EnterGate onEnter={handleEnter} />}

      {/* Background audio element */}
      <audio ref={audioRef} src={songUrl} loop preload="auto" />

      <div className="mx-auto w-full max-w-[460px] md:max-w-6xl">
        {/* Framed panel */}
        <section className="rounded-2xl border-2 border-[#b89a64]/70 bg-[#0c1a42]/90 p-3 sm:p-5 shadow-[inset_0_0_40px_rgba(0,0,0,0.45),0_25px_60px_-15px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
            <CoverCard />
            <DetailsCard />
            <ClosingCard onRsvp={() => setRsvpOpen(true)} />
          </div>
        </section>

        <p className="mt-6 text-center font-serif text-sm italic tracking-wide text-[#ecd5a3]/50">
          <a
            href="https://patrikastudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#ecd5a3] hover:underline underline-offset-4"
          >
            Designed by Patrika Studio
          </a>
        </p>
      </div>

      {/* Floating music play / pause button (icon only) */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#e3c78f]/80 bg-[#0a1633]/95 text-[#ecd5a3] shadow-[0_0_20px_rgba(236,213,163,0.3)] transition-all active:scale-90 hover:scale-110 hover:border-[#ecd5a3]"
      >
        {isPlaying ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            <span className="h-3 w-[2.5px] animate-pulse rounded-full bg-[#ecd5a3]" />
            <span className="h-4 w-[2.5px] animate-pulse rounded-full bg-[#ecd5a3] [animation-delay:0.2s]" />
            <span className="h-2.5 w-[2.5px] animate-pulse rounded-full bg-[#ecd5a3] [animation-delay:0.4s]" />
          </span>
        ) : (
          <svg className="h-5 w-5 fill-current opacity-80" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </button>

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </main>
  );
}
