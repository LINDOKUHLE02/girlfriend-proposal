import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const MUSIC = {
  background: { title: "All Love", src: "/music/all-love.mp3", loop: true },
  "i-think-i-love-u": { title: "I Think I Love U", artist: "Dwele", src: "/music/i-think-i-love-u.mp3", loop: false },
  "cela-sithandane": { title: "Cela 'Sithandane", artist: "Samthing Soweto", src: "/music/cela-sithandane.mp3", loop: false },
  "to-the-moon": { title: "To the Moon", artist: "Phora", src: "/music/to-the-moon.mp3", loop: false },
};

const MUSIC_VOLUME = 0.28;
const MusicContext = createContext(null);

function fade(audio, target, duration = 650) {
  return new Promise((resolve) => {
    const start = audio.volume;
    const startedAt = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      audio.volume = start + (target - start) * progress;
      if (progress < 1) window.requestAnimationFrame(step);
      else resolve();
    };
    window.requestAnimationFrame(step);
  });
}

function loadTrack(audio, source) {
  return new Promise((resolve, reject) => {
    const handleReady = () => {
      cleanup();
      resolve();
    };
    const handleError = () => {
      cleanup();
      reject(audio.error || new Error(`Unable to load ${source}`));
    };
    const cleanup = () => {
      audio.removeEventListener("canplay", handleReady);
      audio.removeEventListener("error", handleError);
    };

    audio.addEventListener("canplay", handleReady, { once: true });
    audio.addEventListener("error", handleError, { once: true });
    audio.src = source;
    audio.load();
    if (audio.readyState >= 3) handleReady();
  });
}

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const backgroundPosition = useRef(0);
  const currentTrackRef = useRef("background");
  const isPlayingRef = useRef(false);
  const hasStartedRef = useRef(false);
  const startRequestedRef = useRef(false);
  const transitioningRef = useRef(false);
  const operation = useRef(Promise.resolve());
  const [currentTrack, setCurrentTrack] = useState("background");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [loadingTrackId, setLoadingTrackId] = useState(null);
  const [audioError, setAudioError] = useState(null);

  const updatePlaying = (playing) => {
    isPlayingRef.current = playing;
    setIsPlaying(playing);
  };

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const checkTrackEnd = () => {
      const isAtTrackEnd = audio.duration > 0 && audio.currentTime > 1 && audio.duration - audio.currentTime < 0.25;
      if (!transitioningRef.current && isAtTrackEnd && currentTrackRef.current !== "background") {
        transitioningRef.current = true;
        operation.current = operation.current.then(async () => {
          audio.src = MUSIC.background.src;
          audio.loop = true;
          audio.currentTime = backgroundPosition.current;
          audio.volume = 0;
          currentTrackRef.current = "background";
          setCurrentTrack("background");
          await audio.play();
          updatePlaying(true);
          await fade(audio, MUSIC_VOLUME);
          transitioningRef.current = false;
        }).catch(() => {
          transitioningRef.current = false;
          updatePlaying(false);
        });
      }
    };

    const endChecker = window.setInterval(checkTrackEnd, 250);
    return () => {
      window.clearInterval(endChecker);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startBackground = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (startRequestedRef.current && !hasStartedRef.current) return operation.current;
    startRequestedRef.current = true;
    operation.current = operation.current.then(async () => {
      if (currentTrackRef.current === "background" && hasStartedRef.current) {
        await audio.play();
        updatePlaying(true);
        return;
      }
      audio.pause();
      audio.src = MUSIC.background.src;
      audio.loop = true;
      audio.currentTime = backgroundPosition.current;
      audio.volume = 0;
      currentTrackRef.current = "background";
      setCurrentTrack("background");
      hasStartedRef.current = true;
      setHasStarted(true);
      await audio.play();
      updatePlaying(true);
      await fade(audio, MUSIC_VOLUME);
    }).catch(() => {
      startRequestedRef.current = false;
      updatePlaying(false);
    });
    return operation.current;
  };

  const playDedication = (trackId) => {
    const selected = MUSIC[trackId];
    const audio = audioRef.current;
    if (!audio || !selected || trackId === "background") return;

    setLoadingTrackId(trackId);
    setAudioError(null);

    operation.current = operation.current.then(async () => {
      transitioningRef.current = true;
      if (currentTrackRef.current === "background") backgroundPosition.current = audio.currentTime;
      await fade(audio, 0, 500);
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
      audio.volume = 0;
      await loadTrack(audio, selected.src);
      currentTrackRef.current = trackId;
      setCurrentTrack(trackId);
      hasStartedRef.current = true;
      setHasStarted(true);
      setLoadingTrackId(null);
      await audio.play();
      updatePlaying(true);
      await fade(audio, MUSIC_VOLUME, 800);
      transitioningRef.current = false;
    }).catch((err) => {
      transitioningRef.current = false;
      setLoadingTrackId(null);
      setAudioError(err?.message || `Unable to load track`);
      updatePlaying(false);
    });
  };

  const dismissError = () => setAudioError(null);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !hasStartedRef.current) return startBackground();
    if (isPlayingRef.current) {
      if (currentTrackRef.current === "background") backgroundPosition.current = audio.currentTime;
      audio.pause();
      updatePlaying(false);
    } else {
      audio.play().then(() => updatePlaying(true)).catch(() => updatePlaying(false));
    }
  };

  useEffect(() => {
    const startFromFirstInteraction = () => {
      if (!hasStartedRef.current) startBackground();
    };
    const captureOptions = { capture: true, passive: true };
    const events = ["pointerdown", "touchstart", "wheel", "scroll", "keydown"];
    events.forEach((eventName) => window.addEventListener(eventName, startFromFirstInteraction, captureOptions));
    return () => events.forEach((eventName) => window.removeEventListener(eventName, startFromFirstInteraction, captureOptions));
  }, []);

  const value = useMemo(() => ({
    tracks: MUSIC,
    currentTrack,
    currentTitle: MUSIC[currentTrack].title,
    currentArtist: MUSIC[currentTrack].artist,
    isPlaying,
    hasStarted,
    loadingTrackId,
    audioError,
    dismissError,
    startBackground,
    playDedication,
    togglePlayback,
  }), [currentTrack, hasStarted, isPlaying, loadingTrackId, audioError]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

// eslint-disable-next-line react-hooks/only-export-components
export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
}
