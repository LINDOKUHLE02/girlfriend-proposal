import Confetti from "react-confetti";

export default function ProposalSuccess() {
  return <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 text-center"><Confetti recycle={false} numberOfPieces={180} colors={["#d88b91", "#f1e8e5", "#8e394b"]} /><div><p className="eyebrow">The best answer</p><h2 className="display mt-5 text-7xl font-medium text-[#f1e8e5] md:text-9xl">Perfect<span className="text-[#d88b91]">.</span></h2><p className="display mt-5 text-3xl text-[#f1e8e5]">Then it's a date.</p><p className="sans mt-8 text-xs uppercase tracking-[.25em] text-[#b6a8aa]">Saturday. You. Me. Dinner.</p></div></div>;
}
