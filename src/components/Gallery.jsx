import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  ["/images/Tashas.jpeg", "Tashas"],
  ["/images/Tashas1.jpeg", "Tashas one"],
  ["/images/Tashas2.jpeg", "Tashas two"],
  ["/images/Tashas3.jpeg", "Tashas three"],
];

function Lightbox({ photos, startIndex, onClose, onNext, onPrev }) {
  const [photo] = photos[startIndex];
  const alt = photos[startIndex][1];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          src={photo}
          alt={alt}
          className="max-h-[90vh] max-w-full rounded-lg object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          decoding="async"
          onClick={(e) => e.stopPropagation()}
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white hover:bg-white/20"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-xl text-white hover:bg-white/20"
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
        <motion.p
          className="absolute bottom-6 text-center text-xs uppercase tracking-[.2em] text-[#b6a8aa]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Tap outside or press ESC to close
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const showNext = () => setActiveIndex((i) => (i + 1) % photos.length);
  const showPrev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <section className="section-shell bg-[#141114]">
      <div className="section-inner">
        <p className="eyebrow">04 / Our memories</p>
        <div className="mt-16 flex items-end justify-between gap-5">
          <h2 className="section-title">Memories<span className="text-[#d88b91]">.</span></h2>
          <span className="sans mb-4 text-xs uppercase tracking-[.2em] text-[#b6a8aa]">
            A few favourites
          </span>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-12 md:grid-rows-[200px_260px]">
          {photos.map(([src, alt], index) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="image-frame group aspect-[4/5] cursor-pointer md:col-span-4 md:row-span-2"
              style={{
                gridRow: index === 0 ? "span 2" : "auto",
                gridColumn: index === 1 ? "span 8" : "span 4",
              }}
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="mt-3 block text-center text-xs uppercase tracking-[.18em] text-[#b6a8aa] md:hidden">
                {alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            photos={photos}
            startIndex={activeIndex}
            onClose={closeLightbox}
            onNext={showNext}
            onPrev={showPrev}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
