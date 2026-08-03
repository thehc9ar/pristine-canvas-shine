import { useEffect, useRef } from "react";

/** Tamanho de cada celula da grade (px). */
const CELL = 14;
/** Quantidade de segmentos visiveis da cobrinha. */
const LENGTH = 18;
/** Intervalo entre passos (ms) - movimento "em degraus", estilo jogo antigo. */
const STEP_MS = 90;

type Point = { x: number; y: number };
type Dir = Point;

const DIRS: readonly Dir[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

/**
 * Cobrinha retro que percorre a area do conteudo com rastro verde
 * inspirado no efeito de chuva do Matrix. Puramente decorativa.
 */
export function SnakeOverlay({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 1;
    let rows = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth === 0 || clientHeight === 0) return;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.floor(clientWidth / CELL));
      rows = Math.max(1, Math.floor(clientHeight / CELL));
    };

    resize();

    let dirIndex = 0;
    let body: Point[] = [{ x: Math.floor(cols / 4), y: Math.floor(rows / 2) }];

    const nextDirection = (head: Point): Dir => {
      const candidate = DIRS[dirIndex]!;
      const ahead = { x: head.x + candidate.x, y: head.y + candidate.y };
      const outOfBounds = ahead.x < 0 || ahead.y < 0 || ahead.x >= cols || ahead.y >= rows;
      if (outOfBounds || Math.random() < 0.06) {
        dirIndex = (dirIndex + (Math.random() < 0.5 ? 1 : 3)) % DIRS.length;
      }
      return DIRS[dirIndex]!;
    };

    const step = () => {
      const head = body[0]!;
      const dir = nextDirection(head);
      const next: Point = {
        x: (head.x + dir.x + cols) % cols,
        y: (head.y + dir.y + rows) % rows,
      };
      body = [next, ...body].slice(0, LENGTH);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      body.forEach((segment, index) => {
        const fade = 1 - index / body.length;
        ctx.fillStyle = `oklch(0.78 0.22 145 / ${(fade * 0.85).toFixed(3)})`;
        ctx.shadowColor = "oklch(0.78 0.22 145 / 0.7)";
        ctx.shadowBlur = index === 0 ? 12 : 6 * fade;
        ctx.fillRect(segment.x * CELL + 1, segment.y * CELL + 1, CELL - 3, CELL - 3);
      });
      ctx.shadowBlur = 0;
    };

    draw();
    if (reduceMotion) return;

    let last = 0;
    let frame = window.requestAnimationFrame(function loop(time: number) {
      if (time - last >= STEP_MS) {
        last = time;
        step();
        draw();
      }
      frame = window.requestAnimationFrame(loop);
    });

    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full"}
    />
  );
}