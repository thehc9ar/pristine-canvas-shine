import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-wider sm:text-6xl text-neon-white">
        INOVAÇÃO SEM LIMITES
      </h1>
    </div>
  );
}
