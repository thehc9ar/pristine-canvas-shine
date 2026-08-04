import { useState } from "react";
import { UserPlus, Search, Mail, Phone, MapPin, Building, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  status: "Ativo" | "Inativo" | "VIP";
  cpfCnpj: string;
}

const initialClientes: Cliente[] = [
  {
    id: "1",
    nome: "Ana Silva Santos",
    email: "ana.silva@email.com",
    telefone: "(83) 98765-4321",
    cidade: "Zabelê - PB",
    status: "VIP",
    cpfCnpj: "123.456.789-00",
  },
  {
    id: "2",
    nome: "Carlos Eduardo Oliveira",
    email: "carlos.edu@techsolucoes.com",
    telefone: "(83) 99123-8877",
    cidade: "Monteiro - PB",
    status: "Ativo",
    cpfCnpj: "12.345.678/0001-90",
  },
  {
    id: "3",
    nome: "Mariana Costa Rêgo",
    email: "mariana.costa@mcosta.com",
    telefone: "(81) 98822-1100",
    cidade: "Recife - PE",
    status: "Ativo",
    cpfCnpj: "987.654.321-11",
  },
  {
    id: "4",
    nome: "Roberto Ferreira Melo",
    email: "roberto.melo@gmail.com",
    telefone: "(83) 98111-2233",
    cidade: "Sertânia - PE",
    status: "Inativo",
    cpfCnpj: "456.789.123-44",
  },
];

export function ClientesTab() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [status, setStatus] = useState<"Ativo" | "Inativo" | "VIP">("Ativo");

  const filteredClientes = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cpfCnpj.includes(searchTerm)
  );

  const handleAddCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) return;

    const newCliente: Cliente = {
      id: Date.now().toString(),
      nome,
      email,
      telefone: telefone || "(00) 00000-0000",
      cidade: cidade || "Zabelê - PB",
      cpfCnpj: cpfCnpj || "000.000.000-00",
      status,
    };

    setClientes([newCliente, ...clientes]);
    setNome("");
    setEmail("");
    setTelefone("");
    setCidade("");
    setCpfCnpj("");
    setStatus("Ativo");
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-400/60" />
          <Input
            placeholder="Buscar por nome, email ou CPF/CNPJ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/40 border-emerald-500/30 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-400 focus:ring-emerald-400/20"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-900/40 cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b1310] border-emerald-500/30 text-emerald-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 font-mono flex items-center gap-2">
                <UserPlus className="h-5 w-5" /> Cadastrar Cliente
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCliente} className="space-y-4 py-2">
              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Nome Completo *
                </label>
                <Input
                  required
                  placeholder="Ex: João da Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Telefone
                  </label>
                  <Input
                    placeholder="(83) 90000-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    CPF ou CNPJ
                  </label>
                  <Input
                    placeholder="000.000.000-00"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Cidade/UF
                  </label>
                  <Input
                    placeholder="Zabelê - PB"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 rounded-md bg-black/60 border border-emerald-500/30 px-3 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="VIP">VIP</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold"
                >
                  Salvar Cliente
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Clientes Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClientes.map((cliente) => (
          <div
            key={cliente.id}
            className="group relative bg-[#09120e]/80 border border-emerald-500/20 hover:border-emerald-400/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-emerald-100 group-hover:text-emerald-300 transition-colors">
                  {cliente.nome}
                </h3>
                <Badge
                  variant="outline"
                  className={
                    cliente.status === "VIP"
                      ? "border-amber-500/50 text-amber-400 bg-amber-950/30"
                      : cliente.status === "Ativo"
                      ? "border-emerald-500/50 text-emerald-400 bg-emerald-950/30"
                      : "border-slate-500/50 text-slate-400 bg-slate-900/30"
                  }
                >
                  {cliente.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-emerald-200/70 font-mono mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="truncate">{cliente.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{cliente.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{cliente.cidade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-400/70">
                    Doc: {cliente.cpfCnpj}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-500/10 flex justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(cliente.id)}
                className="h-8 w-8 p-0 text-red-400/70 hover:text-red-300 hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredClientes.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-emerald-500/20 rounded-xl bg-black/30">
            <p className="text-emerald-500/60 font-mono text-sm">
              Nenhum cliente encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}