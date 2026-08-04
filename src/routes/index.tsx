import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MatrixBackground } from "@/components/matrix-background";
import { Header } from "@/components/crm/Header";
import { ClientesTab } from "@/components/crm/ClientesTab";
import { CobrancasTab } from "@/components/crm/CobrancasTab";
import { ProdutosTab } from "@/components/crm/ProdutosTab";
import { EstoqueTab } from "@/components/crm/EstoqueTab";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Users, CreditCard, Package, Layers, Lock, Mail, Key, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Index,
});

type TabType = "clientes" | "cobrancas" | "produtos" | "estoque";

function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("clientes");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Auth Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Check initial Supabase auth state if configured
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email ?? null);
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email ?? null);
        } else {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    if (isSupabaseConfigured) {
      try {
        if (isRegistering) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          alert("Cadastro efetuado! Verifique seu e-mail para confirmar a conta.");
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
        }
      } catch (err: any) {
        setAuthError(err.message || "Erro de autenticação.");
      } finally {
        setLoading(false);
      }
    } else {
      // Demo authentication fallback mode when user hasn't connected Supabase project yet
      setTimeout(() => {
        setIsAuthenticated(true);
        setUserEmail(email || "admin@zabele.store");
        setLoading(false);
      }, 500);
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    setUserEmail("demo@zabele.store");
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#040807] text-emerald-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Background Matrix Rain */}
      <MatrixBackground className="fixed inset-0 z-0 h-full w-full bg-[#040807]" />

      {!isAuthenticated ? (
        /* LOGIN SCREEN */
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-[#09120e]/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <div className="text-center space-y-2 mb-8">
              <div className="relative inline-flex items-center justify-center mb-3">
                <div className="animate-neon-z-flip flex h-16 w-16 items-center justify-center rounded-2xl bg-black/90 border-2 border-emerald-400 text-emerald-300 font-mono text-4xl font-extrabold shadow-[0_0_30px_rgba(16,185,129,0.7),inset_0_0_15px_rgba(16,185,129,0.4)]">
                  <span className="select-none text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,1)]">
                    Z
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold font-mono tracking-wide text-emerald-100 uppercase">
                Zabelê Store
              </h1>
              <p className="text-xs text-emerald-400/70 font-mono">
                SISTEMA CRM • ACESSO RESTRITO
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="bg-red-950/60 border border-red-500/40 p-3 rounded-lg text-xs font-mono text-red-300">
                  {authError}
                </div>
              )}

              <div>
                <label className="text-xs font-mono text-emerald-400 mb-1.5 block flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> E-mail
                </label>
                <Input
                  required
                  type="email"
                  placeholder="usuario@zabele.store"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400 focus:ring-emerald-400/20"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-emerald-400 mb-1.5 block flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5" /> Senha
                </label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400 focus:ring-emerald-400/20"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-semibold font-mono h-10 mt-2 shadow-lg shadow-emerald-900/30 cursor-pointer"
              >
                {loading
                  ? "Processando..."
                  : isRegistering
                  ? "Criar Conta Supabase"
                  : "Entrar no Sistema"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-emerald-400/70 hover:text-emerald-300 font-mono underline cursor-pointer"
              >
                {isRegistering
                  ? "Já possui uma conta? Fazer Login"
                  : "Não tem conta? Cadastrar via Supabase"}
              </button>
            </div>

            {!isSupabaseConfigured && (
              <div className="mt-6 pt-6 border-t border-emerald-500/10 text-center">
                <p className="text-[11px] text-emerald-500/80 font-mono mb-3">
                  Projeto Supabase ainda não conectado.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDemoAccess}
                  className="w-full border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50 font-mono text-xs cursor-pointer"
                >
                  Entrar no Modo Demonstração <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* CRM DASHBOARD SCREEN */
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header userEmail={userEmail} onLogout={handleLogout} />

          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
            {/* Navigation Tabs */}
            <nav className="flex flex-wrap gap-2 border-b border-emerald-500/20 pb-3">
              <button
                onClick={() => setActiveTab("clientes")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "clientes"
                    ? "bg-emerald-600 text-black shadow-lg shadow-emerald-900/40"
                    : "bg-[#09120e]/60 text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20"
                }`}
              >
                <Users className="h-4 w-4" /> Clientes
              </button>

              <button
                onClick={() => setActiveTab("cobrancas")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "cobrancas"
                    ? "bg-emerald-600 text-black shadow-lg shadow-emerald-900/40"
                    : "bg-[#09120e]/60 text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20"
                }`}
              >
                <CreditCard className="h-4 w-4" /> Cobranças
              </button>

              <button
                onClick={() => setActiveTab("produtos")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "produtos"
                    ? "bg-emerald-600 text-black shadow-lg shadow-emerald-900/40"
                    : "bg-[#09120e]/60 text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20"
                }`}
              >
                <Package className="h-4 w-4" /> Produtos
              </button>

              <button
                onClick={() => setActiveTab("estoque")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-sm font-medium transition-all cursor-pointer ${
                  activeTab === "estoque"
                    ? "bg-emerald-600 text-black shadow-lg shadow-emerald-900/40"
                    : "bg-[#09120e]/60 text-emerald-300 hover:bg-emerald-950/40 border border-emerald-500/20"
                }`}
              >
                <Layers className="h-4 w-4" /> Estoque
              </button>
            </nav>

            {/* Tab Views */}
            <div className="pt-2">
              {activeTab === "clientes" && <ClientesTab />}
              {activeTab === "cobrancas" && <CobrancasTab />}
              {activeTab === "produtos" && <ProdutosTab />}
              {activeTab === "estoque" && <EstoqueTab />}
            </div>
          </main>
        </div>
      )}
    </main>
  );
}