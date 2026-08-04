import { useEffect, useRef } from "react";

/** Matrix Digital Rain component with calmer green/teal colors */
export function MatrixBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fontSize = 14;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops: number[] = new Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * (window.innerHeight / fontSize)));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const newColumns = Math.floor(window.innerWidth / fontSize);
      if (newColumns !== columns) {
        columns = newColumns;
        drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const chars =
      "ZABELE0123456789STORECRM Matrix010101";

    const draw = () => {
      // Semi-transparent calm dark background for soft matrix trail
      ctx.fillStyle = "rgba(6, 12, 10, 0.12)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i]! * fontSize;

        if (y > 0) {
          // Soft calm glow head character
          ctx.fillStyle = "#a7f3d0";
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 4;
          ctx.fillText(char, x, y);

          // Calmer emerald/teal trailing characters
          const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillStyle = "#0d9488";
          ctx.shadowBlur = 0;
          ctx.fillText(prevChar, x, y - fontSize);
        }

        if (y > window.innerHeight && Math.random() > 0.98) {
          drops[i] = Math.floor(Math.random() * -20);
        }
        drops[i]++;
      }
    };

    if (reduceMotion) {
      draw();
      return;
    }

    const interval = setInterval(draw, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 z-0 h-full w-full bg-[#040807]"}
      aria-hidden
    />
  );
}