import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProposalSuccess from "./ProposalSuccess";

const playfulReplies = ["Wrong answer 😭", "Be serious.", "Try again 😂", "That wasn't one of the options.", "Nice try.", "You really thought I'd let you choose that? 😭"];

export default function DinnerInvite() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const handleNo = () => { setNoCount((count) => count + 1); setShaking(true); window.setTimeout(() => setShaking(false), 500); };
  return (
    <section className={`section-shell min-h-screen bg-[#0b0a0c] ${shaking ? "shake" : ""}`}>
      <AnimatePresence mode="wait">
        {accepted ? (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ProposalSuccess /></motion.div>
        ) : (
          <motion.div key="invite" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }} className="section-inner flex min-h-[70vh] flex-col items-center justify-center text-center">
            <p className="eyebrow">One more thing...</p>
            <h2 className="section-title mt-7 max-w-3xl">I'd like to<br /><em className="font-normal text-[#d88b91]">take you out.</em></h2>
            <p className="display mt-8 text-4xl text-[#f1e8e5] md:text-6xl">Dinner with me?</p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <button onClick={() => setAccepted(true)} className="sans rounded-full bg-[#d88b91] px-9 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#190d11] transition hover:bg-[#f1e8e5]">Yes <span aria-hidden="true">♥</span></button>
              <button onClick={handleNo} className="sans rounded-full border border-[var(--line)] px-9 py-4 text-xs font-semibold uppercase tracking-[.2em] text-[#b6a8aa] transition hover:border-[#d88b91] hover:text-[#f1e8e5]">No</button>
            </div>
            <AnimatePresence>{noCount > 0 && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="sans mt-8 text-sm text-[#d88b91]">{playfulReplies[(noCount - 1) % playfulReplies.length]}</motion.p>}</AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}