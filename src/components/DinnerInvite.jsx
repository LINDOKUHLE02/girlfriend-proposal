import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProposalSuccess from "./ProposalSuccess";

const playfulReplies = ["Wrong answer 😭", "Be serious.", "Try again 😂", "That wasn't one of the options.", "Nice try.", "You really thought I'd let you choose that? 😭"];

const noButtonClasses = "sans block select-none whitespace-nowrap rounded-full border border-[var(--line)] bg-[#0b0a0c]/90 px-8 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#b6a8aa] backdrop-blur-sm transition-colors";

export default function DinnerInvite() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  // null while "No" still sits beside "Yes"; then it escapes for good.
  const [spot, setSpot] = useState(null);

  const sectionRef = useRef(null);
  const keepClearRef = useRef(null);
  const noRef = useRef(null);
  const escapedRef = useRef(false);
  const lastSpotRef = useRef(null);

  const dodge = useCallback(() => {
    const section = sectionRef.current;
    const keepClear = keepClearRef.current;
    const btn = noRef.current;
    if (!section || !keepClear || !btn) return;

    const s = section.getBoundingClientRect();
    const k = keepClear.getBoundingClientRect();
    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;
    const pad = 12;
    const gap = 18;

    const maxX = Math.max(0, s.width - bw - pad);
    const maxY = Math.max(0, s.height - bh - pad);

    // Every word on screen, plus the Yes button. Never land here.
    const kx1 = k.left - s.left - gap;
    const ky1 = k.top - s.top - gap;
    const kx2 = k.right - s.left + gap;
    const ky2 = k.bottom - s.top + gap;
    const overWords = (x, y) => x + bw > kx1 && x < kx2 && y + bh > ky1 && y < ky2;

    let next = null;
    for (let attempt = 0; attempt < 90; attempt += 1) {
      const x = pad + Math.random() * maxX;
      const y = pad + Math.random() * maxY;
      if (!overWords(x, y)) { next = { x, y }; break; }
    }

    if (!next) {
      // Cramped screen: use whichever band above / below the words has room.
      const topRoom = Math.max(0, ky1 - bh);
      const bottomRoom = Math.max(0, s.height - pad - bh - ky2);
      const useTop = topRoom >= bottomRoom;
      const x = pad + Math.random() * maxX;
      const rawY = useTop ? Math.random() * topRoom : ky2 + Math.random() * bottomRoom;
      next = { x, y: Math.min(Math.max(rawY, 0), maxY) };
    }

    // Spring from where it currently is, so the first jump looks natural.
    const from = lastSpotRef.current ?? (() => {
      const b = btn.getBoundingClientRect();
      return { x: b.left - s.left, y: b.top - s.top };
    })();

    lastSpotRef.current = next;
    escapedRef.current = true;
    setSpot({ ...next, from });
  }, []);

  const handleNo = () => {
    setNoCount((count) => count + 1);
    setShaking(true);
    dodge();
    window.setTimeout(() => setShaking(false), 500);
  };

  // A resize can put the old spot on top of the words, so re-park it.
  useEffect(() => {
    const onResize = () => { if (escapedRef.current) dodge(); };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [dodge]);

  const noHandlers = {
    onPointerEnter: dodge,
    onPointerDown: dodge,
    onFocus: dodge,
    onClick: handleNo,
  };

  return (
    <section ref={sectionRef} className="section-shell invite-shell relative min-h-screen bg-[#0b0a0c]">
      <AnimatePresence mode="wait">
        {accepted ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ProposalSuccess />
          </motion.div>
        ) : (
          <motion.div ref={keepClearRef} key="invite" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }} className="section-inner flex flex-col items-center justify-center text-center">
            <p className="eyebrow">One more thing...</p>
            <h2 className="section-title mt-7 max-w-3xl">I'd like to<br /><em className="font-normal text-[#d88b91]">take you out.</em></h2>
            <p className="display mt-8 text-4xl text-[#f1e8e5] md:text-6xl">Dinner with me?</p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => setAccepted(true)} className="sans rounded-full bg-[#d88b91] px-9 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#190d11] transition hover:bg-[#f1e8e5]">Yes <span aria-hidden="true">♥</span></button>
              {spot === null && <button ref={noRef} type="button" {...noHandlers} className={`${noButtonClasses} ${shaking ? "shake" : ""}`}>No</button>}
            </div>
            <p className="sans mt-10 text-[10px] uppercase tracking-[.28em] text-[#74676a]">Good luck with that other one.</p>
            <AnimatePresence>{noCount > 0 && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="sans mt-8 text-sm text-[#d88b91]">{playfulReplies[(noCount - 1) % playfulReplies.length]}</motion.p>}</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!accepted && spot && (
        <motion.div
          className="absolute z-20"
          initial={{ left: spot.from.x, top: spot.from.y }}
          animate={{ left: spot.x, top: spot.y }}
          transition={{ type: "spring", stiffness: 260, damping: 24, mass: .7 }}
        >
          <button ref={noRef} type="button" {...noHandlers} style={{ touchAction: "manipulation" }} className={`${noButtonClasses} ${shaking ? "shake" : ""}`}>No</button>
        </motion.div>
      )}
    </section>
  );
}