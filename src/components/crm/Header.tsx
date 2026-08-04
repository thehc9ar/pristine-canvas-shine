import { ShieldCheck, LogOut, Database, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase";

interface HeaderProps {
  userEmail?: string | null;
  onLogout: () => void;
}

export function Header({ userEmail, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-emerald-500/20 bg-[#050c09]/90 backdrop-blur-md sticky top-0 z-20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="font-mono font-bold text-emerald-400 text-lg">Z</span>
          </div>
          <div>
            <h1 className="font-bold text-lg md:text-xl text-emerald-100 tracking-wider font-mono uppercase">
              Zabelê Store
            </h1>
            <p className="text-[10px] text-emerald-400/70 font-mono tracking-widest uppercase">
              SISTEMA CRM MATRIX v1.0
            </p>
          </div>
        </div>

        {/* User Session & Status */}
        <div className="flex items-center gap-3">
          {/* Badge Supabase Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-950/40 text-emerald-300">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isSupabaseConfigured ? "Supabase Conectado" : "Supabase Pendente"}</span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-emerald-500/20">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-300 font-mono">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              <span className="max-w-[150px] truncate">{userEmail || "Admin Zabelê"}</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-emerald-400 hover:text-red-400 hover:bg-red-950/30 border border-emerald-500/20 cursor-pointer"
              title="Sair do Sistema"
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline font-mono text-xs">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}