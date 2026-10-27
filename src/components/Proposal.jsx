import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProposalSuccess from "./ProposalSuccess";
import FloatingHearts from "./FloatingHearts";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
};

export default function Proposal() {
  // null = showing the question, "yes" = celebration, "time" = needs time
  const [status, setStatus] = useState(null);

  // Lock body scroll when celebration is active so the card stays centred
  useEffect(() => {
    if (status === "yes") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [status]);

  const scrollToTop = () => {
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => setStatus(null);

  return (
    <section className="proposal-section relative min-h-screen bg-[#0b0a0c] px-4 py-[max(4rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <AnimatePresence mode="wait">
        {/* ---- QUESTION STATE ---- */}
        {status === null && (
          <motion.div
            key="question"
            initial="initial"
            animate="animate"
            exit="initial"
            variants={fadeUp}
            className="section-inner mx-auto flex min-h-[calc(100vh-max(6rem,env(safe-area-inset-top)))] flex-col items-center justify-center text-center"
          >
            <p className="eyebrow mb-8">07 / ONE MORE THING</p>

            <motion.h2
              className="section-title max-w-3xl text-[#f1e8e5]"
              variants={fadeUp}
              transition={{ duration: 1, delay: 0.1 }}
            >
              Every story has a beginning.
            </motion.h2>

            <motion.p
              className="display mt-4 max-w-2xl text-2xl text-[#f7eeeb] md:text-4xl"
              variants={fadeUp}
              transition={{ duration: 1, delay: 0.25 }}
            >
              I'd love for <span className="text-[#d88b91]">this</span> to be ours.
            </motion.p>

            <motion.p
              className="body-copy mt-12 max-w-md"
              variants={fadeUp}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Out of all the things I could ask you today, there's one that
              means the most to me.
            </motion.p>

            {/* The question fades in gracefully after the build-up */}
            <motion.h3
              className="display mt-16 max-w-2xl text-[clamp(2.5rem,8vw,5rem)] font-medium leading-[1.05] text-[#f1e8e5]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
            >
              Will you be my <span className="text-[#d88b91]">girlfriend</span>?
            </motion.h3>

            {/* Buttons appear after the question */}
            <motion.div
              className="mt-16 flex flex-col items-center gap-4 sm:mt-20 sm:flex-row sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <button
                type="button"
                onClick={() => setStatus("yes")}
                className="proposal-btn proposal-btn--primary"
              >
                Yes, I’d love to <span aria-hidden="true">❤</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("time")}
                className="proposal-btn proposal-btn--secondary"
              >
                I need a little time
              </button>
            </motion.div>

            {/* Subtle scroll hint */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.2 }}
            >
              <span className="block h-px w-10 bg-[#d88b91]/40 mb-2"></span>
              <span className="block text-[10px] uppercase tracking-[.3em] text-[#b6a8aa]">
                Scroll for more
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* ---- YES / CELEBRATION STATE ---- */}
        {status === "yes" && (
          <ProposalSuccess onReliveStory={scrollToTop} key="success" />
        )}

        {/* ---- NEEDS TIME STATE ---- */}
        {status === "time" && (
          <motion.div
            key="time"
            initial="initial"
            animate="animate"
            exit="initial"
            variants={fadeUp}
            className="section-inner mx-auto flex min-h-[calc(100vh-max(6rem,env(safe-area-inset-top)))] flex-col items-center justify-center text-center"
          >
            <p className="eyebrow mb-8">Take all the time you need</p>

            <motion.h2
              className="display max-w-2xl text-4xl font-medium text-[#f1e8e5] md:text-6xl"
              variants={fadeUp}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Of course. There's no rush.
            </motion.h2>

            <motion.p
              className="body-copy mt-8 max-w-md"
              variants={fadeUp}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Whatever your answer, I'm grateful for the moments we've shared.
              <span className="text-[#d88b91]"> ❤</span>
            </motion.p>

            <motion.button
              type="button"
              onClick={handleRetry}
              className="proposal-btn proposal-btn--secondary mt-12"
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Back to the story
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts overlay for celebration */}
      <AnimatePresence>
        {status === "yes" && <FloatingHearts />}
      </AnimatePresence>
    </section>
  );
}
