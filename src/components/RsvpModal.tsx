import { useState, type FormEvent } from "react";
import { FlourishDivider, Heart } from "./Ornaments";

export default function RsvpModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSent(true);
  };

  const close = () => {
    onClose();
    setTimeout(() => setSent(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#030817]/80 backdrop-blur-sm sm:items-center" onClick={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-in @container relative w-full max-w-md rounded-t-2xl border border-[#e3c78f]/50 bg-gradient-to-b from-[#12224f] to-[#070f2a] px-6 pb-8 pt-7 text-center shadow-2xl sm:rounded-xl"
      >
        <div className="pointer-events-none absolute inset-2 rounded-t-xl border border-[#e3c78f]/20 sm:rounded-lg" />
        <button onClick={close} aria-label="Close" className="absolute right-4 top-3 text-2xl text-[#ecd5a3]/80 hover:text-[#ecd5a3]">
          ×
        </button>

        {sent ? (
          <div className="py-6">
            <Heart className="mx-auto w-8 drop-shadow-[0_0_10px_rgba(236,213,163,0.7)]" />
            <h3 className="mt-4 font-script text-5xl gold-script">Thank You</h3>
            <p className="mt-3 font-serif text-lg italic gold-text">
              {attending === "yes"
                ? `Dear ${name}, we can't wait to celebrate with you under the moonlight.`
                : `Dear ${name}, you will be missed. Thank you for your love and blessings.`}
            </p>
            <FlourishDivider className="mt-5" />
            <p className="mt-3 font-script text-3xl gold-script">Ansh &amp; Rini</p>
          </div>
        ) : (
          <form onSubmit={submit} className="relative">
            <h3 className="font-script text-5xl gold-script">Kindly Reply</h3>
            <p className="mt-1 font-serif text-base italic text-[#ecd5a3]/85">by 15 November 2027</p>
            <FlourishDivider className="mt-3" />

            <label className="mt-5 block text-left font-serif text-sm uppercase tracking-[0.15em] text-[#ecd5a3]/80">
              Your Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full name"
                className="mt-1.5 w-full rounded-md border border-[#e3c78f]/40 bg-[#050c22]/70 px-3 py-2.5 font-serif text-lg normal-case tracking-normal text-[#f4e3bf] placeholder:text-[#ecd5a3]/35 focus:border-[#e3c78f] focus:outline-none"
              />
            </label>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {(["yes", "no"] as const).map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setAttending(v)}
                  className={`rounded-md border px-3 py-2.5 font-serif text-base transition ${attending === v
                    ? "border-[#e3c78f] bg-[#e3c78f]/15 text-[#f4e3bf]"
                    : "border-[#e3c78f]/30 text-[#ecd5a3]/70"
                    }`}
                >
                  {v === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                </button>
              ))}
            </div>

            {attending === "yes" && (
              <div className="mt-4 flex items-center justify-between rounded-md border border-[#e3c78f]/30 px-3 py-2">
                <span className="font-serif text-sm uppercase tracking-[0.15em] text-[#ecd5a3]/80">Guests</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-8 w-8 rounded-full border border-[#e3c78f]/50 text-[#ecd5a3]">−</button>
                  <span className="w-4 font-serif text-xl text-[#f4e3bf]">{guests}</span>
                  <button type="button" onClick={() => setGuests((g) => Math.min(6, g + 1))} className="h-8 w-8 rounded-full border border-[#e3c78f]/50 text-[#ecd5a3]">+</button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-gradient-to-b from-[#f1dcaa] to-[#c9a35f] py-3 font-serif text-lg font-semibold uppercase tracking-[0.2em] text-[#0a1633] shadow-[0_0_20px_rgba(236,213,163,0.3)] transition active:scale-[0.98]"
            >
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
