import { motion } from "framer-motion";

export default function ProposalSuccess({ onReliveStory }) {
  return (
    <motion.div
      className="section-inner mx-auto flex min-h-[calc(100vh-max(6rem,env(safe-area-inset-top)))] flex-col items-center justify-center text-center px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Soft pink glow behind the text */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d88b91]/15 blur-[80px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
      />

      <motion.p
        className="eyebrow mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        The best answer
      </motion.p>

      <motion.h2
        className="display text-[clamp(3rem,10vw,8rem)] font-medium leading-[.85] text-[#f1e8e5]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        Then here’s to our next chapter.<br />
        <span className="text-[#d88b91]">Together.</span> <span aria-hidden="true">❤</span>
      </motion.h2>

      <motion.p
        className="body-copy mt-8 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
      >
        More memories, more laughter, more adventures, and a whole lot of
        moments we haven’t experienced yet. I can’t wait.
      </motion.p>

      <motion.button
        type="button"
        onClick={onReliveStory}
        className="proposal-btn proposal-btn--secondary mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        Relive our story
      </motion.button>
    </motion.div>
  );
}

