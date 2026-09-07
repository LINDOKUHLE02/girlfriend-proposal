export default function FloatingHearts() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden"><span className="float-mark absolute left-[8%] top-[28%] text-xl text-[#d88b91]/40">✦</span><span className="float-mark absolute right-[12%] top-[62%] text-sm text-[#d88b91]/30" style={{ animationDelay: "-3s" }}>✦</span></div>;
}
