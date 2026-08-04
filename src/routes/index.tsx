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
      <div className="relative z-10 text-center px-4 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neon-white drop-shadow-[0_0_20px_rgba(0,255,100,0.8)]">
          INOVAÇÃO SEM LIMITES
        </h1>
        <p className="mt-4 font-mono text-sm md:text-base text-emerald-400/80 tracking-widest uppercase">
          Matrix Rain & Retro Snake
        </p>
        <div className="mt-6 inline-block animate-move-side">
          <p className="font-mono text-lg md:text-2xl font-bold tracking-widest uppercase text-neon-cyan">
            PAULO RICÃO
          </p>
        </div>
      </div>
    </main>
  );
}
