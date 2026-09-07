import { motion } from "framer-motion";

export default function WhereWereGoing() {
  return <section className="section-shell bg-[#8e394b] py-32"><div className="section-inner max-w-4xl"><motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}><p className="eyebrow text-[#f1d2d0]">06 / Next</p><h2 className="section-title max-w-3xl text-[#f7eeeb]">I don't know exactly what the future looks like.</h2><p className="display mt-10 max-w-2xl text-3xl leading-tight text-[#f7eeeb] md:text-5xl">But I know there's still a lot I'd like to experience with you.</p><div className="mt-16 flex items-center gap-6"><span className="line w-16 bg-[#f1d2d0]" /><p className="sans text-xs uppercase tracking-[.25em] text-[#f1d2d0]">Let's make another memory</p></div></motion.div></div></section>;
}
