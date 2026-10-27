# A Little Something For You

A personal romantic journey told through photographs, music, and memories — culminating in a proposal.

## Tech

- React 19 with hooks & context
- Vite build pipeline
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- Oxlint for code quality

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Structure

```
src/
├── components/
│   ├── MusicContext.jsx    # Audio playback with fade, loading & error states
│   ├── MusicControl.jsx    # Fixed playback control bar
│   ├── Hero.jsx            # Opening screen with start trigger
│   ├── HowWeMet.jsx        # Chapter 01 — The beginning
│   ├── MemoryTimeline.jsx  # Chapter 02 — In between
│   ├── LittleThings.jsx    # Chapter 03 — The details
│   ├── Gallery.jsx         # Chapter 04 — Our memories (with lightbox)
│   ├── DedicationSongs.jsx # Chapter 05 — Our soundtrack (3 dedications)
│   ├── WhereWeAreNow.jsx   # Interstitial — Right now
│   ├── WhereWereGoing.jsx  # Chapter 06 — Next
│   ├── Proposal.jsx        # Chapter 07 — The proposal (yes / needs time)
│   ├── ProposalSuccess.jsx # Celebration screen
│   ├── FloatingHearts.jsx  # Confetti overlay (respects reduced-motion)
│   └── Footer.jsx
└── App.jsx
```