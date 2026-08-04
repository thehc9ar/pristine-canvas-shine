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

    const fontSize = 16;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops: number[] = new Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -50));

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
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789AZXCVBNM";

    const draw = () => {
      // Semi-transparent black to create trailing rain effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i]! * fontSize;

        if (y > 0) {
          // Bright glowing head character for the rain drop
          ctx.fillStyle = "#e0ffe0";
          ctx.shadowColor = "#00ff66";
          ctx.shadowBlur = 8;
          ctx.fillText(char, x, y);

          // Green character trail right above
          const prevChar = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillStyle = "oklch(0.78 0.22 145)";
          ctx.shadowBlur = 0;
          ctx.fillText(prevChar, x, y - fontSize);
        }

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
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
