import { createFileRoute } from "@tanstack/react-router";
import { SnakeOverlay } from "@/components/snake-overlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sobre o Projeto | Soluções simples e eficientes" },
      {
        name: "description",
        content:
          "Conheça o projeto: foco em inovação, qualidade técnica e uma experiência de usuário simples e direta.",
      },
      { property: "og:title", content: "Sobre o Projeto" },
      {
        property: "og:description",
        content:
          "Projeto focado em inovação, qualidade técnica e experiência de usuário simples e direta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const destaques = [
  "Inovação",
  "Qualidade",
  "Foco no usuário",
] as const;

function Index() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
      <SnakeOverlay />
      <h1 className="relative text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Sobre o Projeto
      </h1>
      <p className="relative mt-5 text-base leading-7 text-muted-foreground">
        Um projeto feito para resolver problemas reais com simplicidade: boa
        experiência de uso e qualidade técnica, sem excesso.
      </p>
      <ul className="relative mt-8 space-y-2 text-sm text-muted-foreground">
        {destaques.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-foreground" />
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
