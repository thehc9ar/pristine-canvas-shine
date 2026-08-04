import { useState } from "react";
import { CreditCard, PlusCircle, Calendar, CheckCircle2, AlertCircle, Clock, Search } from "lucide-react";
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

export interface Cobranca {
  id: string;
  clienteNome: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: "Pago" | "Pendente" | "Atrasado";
}

const initialCobrancas: Cobranca[] = [
  {
    id: "1",
    clienteNome: "Ana Silva Santos",
    descricao: "Compra de Peças de Vestuário",
    valor: 450.0,
    vencimento: "2025-04-10",
    status: "Pago",
  },
  {
    id: "2",
    clienteNome: "Carlos Eduardo Oliveira",
    descricao: "Fornecimento de Mercadorias Lote #88",
    valor: 1280.5,
    vencimento: "2025-04-15",
    status: "Pendente",
  },
  {
    id: "3",
    clienteNome: "Mariana Costa Rêgo",
    descricao: "Acessórios e Confecções Zabelê",
    valor: 320.0,
    vencimento: "2025-03-28",
    status: "Atrasado",
  },
  {
    id: "4",
    clienteNome: "Roberto Ferreira Melo",
    descricao: "Pedido Especial Sob Medida",
    valor: 890.0,
    vencimento: "2025-04-20",
    status: "Pendente",
  },
];

export function CobrancasTab() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>(initialCobrancas);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [clienteNome, setClienteNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [status, setStatus] = useState<"Pago" | "Pendente" | "Atrasado">("Pendente");

  const filteredCobrancas = cobrancas.filter(
    (c) =>
      c.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPago = cobrancas
    .filter((c) => c.status === "Pago")
    .reduce((acc, curr) => acc + curr.valor, 0);

  const totalPendente = cobrancas
    .filter((c) => c.status === "Pendente" || c.status === "Atrasado")
    .reduce((acc, curr) => acc + curr.valor, 0);

  const handleAddCobranca = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteNome || !valor || !vencimento) return;

    const newCobranca: Cobranca = {
      id: Date.now().toString(),
      clienteNome,
      descricao: descricao || "Cobrança Diversa",
      valor: parseFloat(valor),
      vencimento,
      status,
    };

    setCobrancas([newCobranca, ...cobrancas]);
    setClienteNome("");
    setDescricao("");
    setValor("");
    setVencimento("");
    setStatus("Pendente");
    setIsOpen(false);
  };

  const toggleStatus = (id: string) => {
    setCobrancas(
      cobrancas.map((c) => {
        if (c.id === id) {
          const nextStatus =
            c.status === "Pendente"
              ? "Pago"
              : c.status === "Pago"
              ? "Atrasado"
              : "Pendente";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Resumo financeiro rápido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#09140f]/90 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">
              Total Recebido (Pago)
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-300 mt-2">
            R$ {totalPago.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-[#09140f]/90 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400">
              A Receber / Pendente
            </span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-300 mt-2">
            R$ {totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-[#09140f]/90 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-md sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400">
              Total Lançamentos
            </span>
            <CreditCard className="h-4 w-4 text-teal-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-teal-200 mt-2">
            {cobrancas.length} Registros
          </p>
        </div>
      </div>

      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-400/60" />
          <Input
            placeholder="Buscar por cliente ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/40 border-emerald-500/30 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-400"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-900/40 cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" /> Nova Cobrança
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b1310] border-emerald-500/30 text-emerald-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 font-mono flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Criar Lançamento
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCobranca} className="space-y-4 py-2">
              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Cliente *
                </label>
                <Input
                  required
                  placeholder="Nome do cliente"
                  value={clienteNome}
                  onChange={(e) => setClienteNome(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Descrição do Serviço / Produto
                </label>
                <Input
                  placeholder="Ex: Venda Lote Vestuário Zabelê"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Valor (R$) *
                  </label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Data Vencimento *
                  </label>
                  <Input
                    required
                    type="date"
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Status Inicial
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-9 rounded-md bg-black/60 border border-emerald-500/30 px-3 text-sm text-emerald-100 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Pago">Pago</option>
                  <option value="Atrasado">Atrasado</option>
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
                  Gerar Cobrança
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cobranças List */}
      <div className="space-y-3">
        {filteredCobrancas.map((cob) => (
          <div
            key={cob.id}
            className="bg-[#09120e]/80 border border-emerald-500/20 hover:border-emerald-400/40 rounded-xl p-4 backdrop-blur-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-emerald-100">{cob.clienteNome}</h4>
                <Badge
                  onClick={() => toggleStatus(cob.id)}
                  className={`cursor-pointer select-none transition-all ${
                    cob.status === "Pago"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-900/60"
                      : cob.status === "Pendente"
                      ? "bg-amber-950/60 text-amber-400 border border-amber-500/50 hover:bg-amber-900/60"
                      : "bg-red-950/60 text-red-400 border border-red-500/50 hover:bg-red-900/60"
                  }`}
                >
                  {cob.status === "Pago" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {cob.status === "Pendente" && <Clock className="w-3 h-3 mr-1" />}
                  {cob.status === "Atrasado" && <AlertCircle className="w-3 h-3 mr-1" />}
                  {cob.status} (Clique p/ alterar)
                </Badge>
              </div>
              <p className="text-xs text-emerald-300/70 font-mono">{cob.descricao}</p>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400/70 font-mono">
                <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                <span>Venc: {cob.vencimento}</span>
              </div>

              <div className="font-mono text-lg font-bold text-emerald-300">
                R$ {cob.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        ))}

        {filteredCobrancas.length === 0 && (
          <div className="text-center py-12 border border-dashed border-emerald-500/20 rounded-xl bg-black/30">
            <p className="text-emerald-500/60 font-mono text-sm">
              Nenhuma cobrança registrada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}