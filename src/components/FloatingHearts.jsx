// Elegant floating hearts/confetti overlay for the celebration state.
// Respects reduced-motion preference.
import { useReducedMotion } from "framer-motion";

const HEART_COUNT = 40;

// Pre-compute once at module load so we never call Math.random during render.
const HEARTS = Array.from({ length: HEART_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 10 + Math.random() * 16,
  delay: Math.random() * 5,
  duration: 6 + Math.random() * 4,
}));

export default function FloatingHearts() {
  const reduced = useReducedMotion();

  // Only render the animation layer when motion is allowed
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {HEARTS.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-20px] text-[#d88b91]/30"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            fontSize: `${h.size}px`,
            animationName: "float-heart",
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          ❤
        </div>
      ))}

      <style>{`
        @keyframes float-heart {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.7; }
          50% {
            transform: translateY(calc(-100vh - 40px)) rotate(360deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(calc(-100vh - 40px)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
