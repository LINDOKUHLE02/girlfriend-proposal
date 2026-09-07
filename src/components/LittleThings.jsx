import { motion } from "framer-motion";

const littleThings = [
  { image: "/images/IMG_7715.JPEG", text: "The random conversations." },
  { image: "/images/IMG_7728.JPEG", text: "The laughs." },
  { image: "/images/IMG_7356.JPEG", text: "The little moments." },
];

export default function LittleThings() {
  return (
    <section className="section-shell bg-[#0b0a0c]">
      <div className="section-inner">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">03 / The details</p><h2 className="section-title max-w-xl">The little<br /><em className="font-normal text-[#d88b91]">things.</em></h2></div><p className="body-copy max-w-xs">The moments that probably did not seem important at the time... but became some of my favourites.</p></div>
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {littleThings.map((item, index) => <motion.figure key={item.image} initial={{ opacity: 0, y: 30, rotate: index === 1 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? 2 : -2 }} viewport={{ once: true }} transition={{ delay: index * .12, duration: .7 }} className={index === 1 ? "md:mt-16" : ""}><div className="image-frame aspect-[4/5]"><img src={item.image} alt={item.text} /></div><figcaption className="mt-4 sans text-xs uppercase tracking-[.18em] text-[#b6a8aa]">{item.text}</figcaption></motion.figure>)}
        </div>
      </div>
    </section>
  );
}
