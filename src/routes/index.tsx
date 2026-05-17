import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

 function Index() {
   return (
     <div className="min-h-screen bg-background">
       <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
         <section className="mx-auto max-w-3xl text-center">
           <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
             Sobre o Projeto
           </h1>
           <p className="mt-6 text-lg leading-8 text-muted-foreground">
             Este projeto foi desenvolvido com o objetivo de criar soluções inovadoras e eficientes, focando na experiência do usuário e na qualidade técnica. Buscamos constantemente superar desafios e entregar resultados que agreguem valor real aos nossos usuários.
           </p>
         </section>

         <section className="mt-20">
           <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
             <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
               <h3 className="text-xl font-semibold text-foreground">Inovação</h3>
               <p className="mt-4 text-muted-foreground">
                 Utilizamos as tecnologias mais recentes para garantir que o projeto esteja sempre na vanguarda do mercado.
               </p>
             </div>
             <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
               <h3 className="text-xl font-semibold text-foreground">Qualidade</h3>
               <p className="mt-4 text-muted-foreground">
                 Foco total em performance, acessibilidade e design responsivo para todos os dispositivos.
               </p>
             </div>
             <div className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
               <h3 className="text-xl font-semibold text-foreground">Foco no Usuário</h3>
               <p className="mt-4 text-muted-foreground">
                 Cada detalhe é pensado para proporcionar a melhor experiência possível para quem utiliza nossa plataforma.
               </p>
             </div>
           </div>
         </section>
       </main>
     </div>
   );
 }
