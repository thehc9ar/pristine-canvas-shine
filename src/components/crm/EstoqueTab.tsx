import { useState } from "react";
import { Layers, ArrowUpRight, ArrowDownRight, AlertTriangle, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface ItemEstoque {
  id: string;
  codigo: string;
  produtoNome: string;
  quantidade: number;
  minimo: number;
  localizacao: string;
}

const initialEstoque: ItemEstoque[] = [
  {
    id: "1",
    codigo: "ZBL-001",
    produtoNome: "Camisa Algodão Renda Zabelê",
    quantidade: 42,
    minimo: 10,
    localizacao: "Prateleira A1",
  },
  {
    id: "2",
    codigo: "ZBL-002",
    produtoNome: "Bolsa Artesanal Tecido Nordestino",
    quantidade: 5,
    minimo: 8,
    localizacao: "Prateleira B3",
  },
  {
    id: "3",
    codigo: "ZBL-003",
    produtoNome: "Chapéu de Palha Estilizado",
    quantidade: 18,
    minimo: 5,
    localizacao: "Prateleira C2",
  },
  {
    id: "4",
    codigo: "ZBL-004",
    produtoNome: "Vestido Linho Bordado Manual",
    quantidade: 2,
    minimo: 5,
    localizacao: "Prateleira A2",
  },
];

export function EstoqueTab() {
  const [estoque, setEstoque] = useState<ItemEstoque[]>(initialEstoque);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEstoque = estoque.filter(
    (item) =>
      item.produtoNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateQuantidade = (id: string, delta: number) => {
    setEstoque(
      estoque.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantidade + delta);
          return { ...item, quantidade: newQty };
        }
        return item;
      })
    );
  };

  const itensBaixoEstoque = estoque.filter((item) => item.quantidade <= item.minimo).length;

  return (
    <div className="space-y-6">
      {/* Resumo Estoque */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#09140f]/90 border border-emerald-500/20 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400">
              Total de Itens
            </span>
            <Layers className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-300 mt-2">
            {estoque.reduce((acc, curr) => acc + curr.quantidade, 0)} unidades
          </p>
        </div>

        <div className="bg-[#09140f]/90 border border-amber-500/20 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400">
              Estoque Baixo / Alerta
            </span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-300 mt-2">
            {itensBaixoEstoque} Produtos
          </p>
        </div>

        <div className="bg-[#09140f]/90 border border-teal-500/20 p-4 rounded-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-teal-400">
              Variedade no Catálogo
            </span>
            <Check className="h-4 w-4 text-teal-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-teal-200 mt-2">
            {estoque.length} SKUs
          </p>
        </div>
      </div>

      {/* Top action bar */}
      <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-400/60" />
          <Input
            placeholder="Buscar item ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/40 border-emerald-500/30 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Tabela de Estoque */}
      <div className="bg-[#09120e]/80 border border-emerald-500/20 rounded-xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-emerald-950/40 text-emerald-400 border-b border-emerald-500/20 text-xs uppercase">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Localização</th>
                <th className="p-3">Qtd Atual</th>
                <th className="p-3">Qtd Mínima</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10 text-emerald-100">
              {filteredEstoque.map((item) => {
                const isLow = item.quantidade <= item.minimo;

                return (
                  <tr key={item.id} className="hover:bg-emerald-950/20 transition-colors">
                    <td className="p-3 text-emerald-500 font-bold">{item.codigo}</td>
                    <td className="p-3 font-semibold text-emerald-200">{item.produtoNome}</td>
                    <td className="p-3 text-emerald-400/70">{item.localizacao}</td>
                    <td className="p-3 font-bold text-base">{item.quantidade}</td>
                    <td className="p-3 text-emerald-500/70">{item.minimo}</td>
                    <td className="p-3">
                      {isLow ? (
                        <Badge variant="outline" className="border-amber-500/50 text-amber-400 bg-amber-950/30">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Recompor
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-950/30">
                          Normal
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantidade(item.id, -1)}
                          className="h-8 w-8 p-0 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40"
                          title="Dar baixa em 1"
                        >
                          <ArrowDownRight className="h-4 w-4 text-red-400" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantidade(item.id, 1)}
                          className="h-8 w-8 p-0 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40"
                          title="Adicionar 1 ao estoque"
                        >
                          <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredEstoque.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-emerald-500/60 font-mono">
                    Nenhum item de estoque encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}