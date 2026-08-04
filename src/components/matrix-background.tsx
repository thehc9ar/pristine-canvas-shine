import { useEffect, useRef } from "react";

/** Matrix Digital Rain component */
export function MatrixBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const fontSize = 16;
    let columns = Math.floor(window.innerWidth / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "oklch(0.78 0.22 145)"; // Matrix Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i]! * fontSize);

        if (drops[i]! * fontSize > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    if (reduceMotion) {
      draw();
      return;
    }

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 -z-10 h-full w-full bg-black"}
      aria-hidden
    />
  );
}
