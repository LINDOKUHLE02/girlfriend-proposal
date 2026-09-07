import { motion } from "framer-motion";
import { useMusic } from "./MusicContext";

const songs = [
  { id: "i-think-i-love-u", number: "01", title: "I Think I Love U", artist: "Dwele", note: "For the unexpected beginning, and the feeling of realising I was starting to fall." },
  { id: "cela-sithandane", number: "02", title: "Cela 'Sithandane", artist: "Samthing Soweto", note: "Because one of your favourite artists deserved a place in our story." },
  { id: "to-the-moon", number: "03", title: "To the Moon", artist: "Phora", note: "For the way he says what it feels like to love a girl like you." },
];

export default function DedicationSongs() {
  const { currentTrack, isPlaying, playDedication } = useMusic();
  return <section className="section-shell bg-[#0b0a0c] pt-0"><div className="section-inner"><div className="line mb-12" /><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">A soundtrack for us</p><h2 className="display mt-3 text-5xl text-[#f1e8e5] md:text-7xl">Three songs, <em className="font-normal text-[#d88b91]">three feelings.</em></h2></div><p className="body-copy max-w-xs">Tap a song when you want to hear the feeling behind that part of the story.</p></div><div className="mt-12 grid gap-3 md:grid-cols-3">{songs.map((song, index) => { const active = currentTrack === song.id && isPlaying; return <motion.button type="button" key={song.id} onClick={() => playDedication(song.id)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className={`group rounded-2xl border p-5 text-left transition ${active ? "border-[#d88b91] bg-[#8e394b]/20" : "border-white/10 bg-[#141114] hover:border-[#d88b91]/60"}`}><span className="sans text-xs tracking-[.2em] text-[#d88b91]">{song.number}</span><span className="mt-10 flex items-center justify-between gap-3"><span><strong className="display block text-3xl font-medium text-[#f1e8e5]">{song.title}</strong><span className="sans mt-1 block text-xs uppercase tracking-[.18em] text-[#b6a8aa]">{song.artist}</span></span><span aria-hidden="true" className={`music-card-play ${active ? "music-card-play--active" : ""}`}>{active ? "Ⅱ" : "▶"}</span></span><span className="body-copy mt-7 block text-sm leading-6">{song.note}</span></motion.button>; })}</div></div></section>;
}
