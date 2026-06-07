"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/lib/gsheet";
import SectionWrapper, { GoldDivider } from "./SectionWrapper";
import { useScrollReveal } from "@/lib/gsap";

export default function RSVPSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40 });
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | "">("");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attendance) {
      setError("Please fill in your name and attendance.");
      return;
    }

    if (attendance === "yes" && guests < 1) {
      setError("Please enter at least 1 guest.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await submitRSVP({
      name: name.trim(),
      attendance,
      guests: attendance === "yes" ? guests : 0,
      message: message.trim(),
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setName("");
      setAttendance("");
      setGuests(1);
      setMessage("");
    } else {
      setError(result.message);
    }
  };

  return (
    <SectionWrapper id="rsvp" label="RSVP">
      <div ref={ref} className="mx-auto max-w-lg text-center">
        <h2 className="font-cinzel text-2xl text-gold sm:text-3xl md:text-5xl">
          Will You Join Us?
        </h2>
        <GoldDivider />

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold text-3xl text-gold"
              >
                ✓
              </motion.div>
              <p className="font-cormorant text-2xl italic text-gold-light">
                Thank you for your response!
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 font-montserrat text-xs uppercase tracking-widest text-white/40 underline"
              >
                Submit another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 text-left"
            >
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="mb-2 block font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Your Name
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gold/20 bg-luxury-card px-4 py-3.5 font-cormorant text-base text-white outline-none transition-colors focus:border-gold/60 sm:px-5 sm:py-4 sm:text-lg"
                  required
                />
              </div>

              <div role="group" aria-labelledby="rsvp-attendance-label">
                <span
                  id="rsvp-attendance-label"
                  className="mb-3 block font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Will you attend?
                </span>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      aria-pressed={attendance === val}
                      onClick={() => setAttendance(val)}
                      className={`flex-1 border px-3 py-3 font-montserrat text-[10px] uppercase tracking-[0.15em] transition-all sm:text-xs sm:tracking-widest ${
                        attendance === val
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-gold/20 text-white/50 hover:border-gold/40"
                      }`}
                    >
                      {val === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                    </button>
                  ))}
                </div>
              </div>

              {attendance === "yes" && (
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="mb-2 block font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/40"
                  >
                    Number of Guests
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-full border border-gold/20 bg-luxury-card px-4 py-3.5 font-cormorant text-base text-white outline-none focus:border-gold/60 sm:px-5 sm:py-4 sm:text-lg"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="rsvp-message"
                  className="mb-2 block font-montserrat text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share your wishes..."
                  className="w-full resize-none border border-gold/20 bg-luxury-card px-4 py-3.5 font-cormorant text-base text-white outline-none focus:border-gold/60 sm:px-5 sm:py-4 sm:text-lg"
                />
              </div>

              {error && (
                <p className="text-center font-montserrat text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full border border-gold py-4 font-montserrat text-[11px] uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-luxury-black disabled:opacity-50"
              >
                {loading ? "Sending..." : "Confirm RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
