import { useMusic } from "./MusicContext";

export default function MusicControl() {
  const {
    currentTitle,
    currentTrack,
    hasStarted,
    isPlaying,
    togglePlayback,
    audioError,
    dismissError,
  } = useMusic();

  return (
    <button
      type="button"
      aria-label={audioError ? "Retry audio" : isPlaying ? "Pause music" : "Play music"}
      onClick={audioError ? dismissError : togglePlayback}
      className="music-control fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-white/15 bg-[#141114]/90 px-4 py-3 text-left text-[#f1e8e5] shadow-2xl backdrop-blur-md transition hover:border-[#d88b91]"
    >
      <span
        className={`music-control__icon ${isPlaying && !audioError ? "music-control__icon--playing" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </span>
      <span className="sans hidden min-w-0 sm:block">
        <span className="block text-[10px] uppercase tracking-[.2em] text-[#b6a8aa]">
          {audioError
            ? "Error"
            : hasStarted
              ? currentTrack === "background"
                ? "Now playing"
                : "Dedication"
              : "Soundtrack"}
        </span>
        <span className="block max-w-32 truncate text-xs">
          {audioError ? "Tap to retry" : hasStarted ? currentTitle : "Begin the journey"}
        </span>
      </span>
    </button>
  );
}
