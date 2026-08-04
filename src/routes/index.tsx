import { createFileRoute } from "@tanstack/react-router";
import { MatrixBackground } from "@/components/matrix-background";
import { SnakeOverlay } from "@/components/snake-overlay";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none">
      <MatrixBackground className="fixed inset-0 z-0 h-full w-full bg-black" />
      <SnakeOverlay className="pointer-events-none fixed inset-0 h-full w-full z-0" />
      <div className="relative z-10 text-center px-4 pointer-events-none flex flex-col items-center justify-center">
        {/* Portal estilo Rick & Morty */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute w-44 h-44 md:w-60 md:h-60 rounded-full bg-cyan-500/30 blur-2xl animate-pulse" />
          <div className="relative w-40 h-40 md:w-56 md:h-56 animate-portal-pulse">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <defs>
                <radialGradient id="rick-portal-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e0ffff" />
                  <stop offset="25%" stopColor="#00ffff" />
                  <stop offset="60%" stopColor="#00b3b3" />
                  <stop offset="85%" stopColor="#004d4d" />
                  <stop offset="100%" stopColor="#001a1a" stopOpacity="0.9" />
                </radialGradient>
                <filter id="rick-portal-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <circle cx="100" cy="100" r="90" fill="url(#rick-portal-grad)" filter="url(#rick-portal-glow)" />

              <g className="animate-[spin_5s_linear_infinite] origin-center opacity-85">
                <ellipse cx="100" cy="100" rx="80" ry="60" fill="none" stroke="#80ffff" strokeWidth="5" strokeDasharray="45 20 15 25" />
                <ellipse cx="100" cy="100" rx="65" ry="75" fill="none" stroke="#00ffff" strokeWidth="6" strokeDasharray="30 25 10 20" />
                <ellipse cx="100" cy="100" rx="50" ry="40" fill="none" stroke="#00e5ff" strokeWidth="7" strokeDasharray="25 15 20 10" />
              </g>

              <g className="animate-[spin_3.5s_linear_infinite_reverse] origin-center opacity-90">
                <ellipse cx="100" cy="100" rx="85" ry="85" fill="none" stroke="#00bfff" strokeWidth="4" strokeDasharray="60 30" />
                <ellipse cx="100" cy="100" rx="55" ry="70" fill="none" stroke="#b2ffff" strokeWidth="5" strokeDasharray="20 30 10 20" />
                <ellipse cx="100" cy="100" rx="35" ry="30" fill="none" stroke="#00f5ff" strokeWidth="6" strokeDasharray="15 15" />
              </g>

              <circle cx="100" cy="100" r="16" fill="#e0ffff" className="animate-ping opacity-75 origin-center" />
              <circle cx="100" cy="100" r="12" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neon-white drop-shadow-[0_0_10px_rgba(0,255,100,0.4)]">
          INOVAÇÃO SEM LIMITES
        </h1>
        <p className="mt-4 font-mono text-sm md:text-base text-emerald-400/80 tracking-widest uppercase">
          Matrix Rain & Retro Snake
        </p>
      </div>
    </main>
  );
}
