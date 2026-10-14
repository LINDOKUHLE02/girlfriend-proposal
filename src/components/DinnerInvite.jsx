import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProposalSuccess from "./ProposalSuccess";

const playfulReplies = ["Wrong answer 😭", "Be serious.", "Try again 😂", "That wasn't one of the options.", "Nice try.", "You really thought I'd let you choose that? 😭"];

// Picks a new spot for the "No" button, always far enough away from the last
// one that it never lands straight back under her cursor.
function nextSpot(prev) {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const x = 14 + Math.random() * 72;
    const y = 18 + Math.random() * 62;
    if (!prev || Math.hypot(x - prev.x, y - prev.y) > 38) return { x, y };
  }
  return { x: 100 - prev.x, y: 100 - prev.y };
}

export default function DinnerInvite() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [spot, setSpot] = useState({ x: 82, y: 74 });

  const dodge = useCallback(() => {
    setSpot((prev) => nextSpot(prev));
  }, []);

  const handleNo = () => {
    setNoCount((count) => count + 1);
    setShaking(true);
    dodge();
    window.setTimeout(() => setShaking(false), 500);
  };

  return (
    <section className="section-shell relative min-h-screen bg-[#0b0a0c]">
      <AnimatePresence mode="wait">
        {accepted ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProposalSuccess />
          </motion.div>
        ) : (
          <motion.div key="invite" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }} className="section-inner flex min-h-[70vh] flex-col items-center justify-center text-center">
            <p className="eyebrow">One more thing...</p>
            <h2 className="section-title mt-7 max-w-3xl">I'd like to<br /><em className="font-normal text-[#d88b91]">take you out.</em></h2>
            <p className="display mt-8 text-4xl text-[#f1e8e5] md:text-6xl">Dinner with me?</p>
            <button onClick={() => setAccepted(true)} className="sans mt-12 rounded-full bg-[#d88b91] px-9 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#190d11] transition hover:bg-[#f1e8e5]">Yes <span aria-hidden="true">♥</span></button>
            <p className="sans mt-10 text-[10px] uppercase tracking-[.28em] text-[#74676a]">Good luck with that other one.</p>
            <AnimatePresence>{noCount > 0 && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="sans mt-8 text-sm text-[#d88b91]">{playfulReplies[(noCount - 1) % playfulReplies.length]}</motion.p>}</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!accepted && (
        <motion.div
          className="absolute z-20"
          animate={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          transition={{ type: "spring", stiffness: 240, damping: 22, mass: .7 }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2">
            <button
              type="button"
              onMouseEnter={dodge}
              onFocus={dodge}
              onClick={handleNo}
              className={`sans block whitespace-nowrap rounded-full border border-[var(--line)] bg-[#0b0a0c]/90 px-8 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#b6a8aa] backdrop-blur-sm transition-colors ${shaking ? "shake" : ""}`}
            >
              No
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}