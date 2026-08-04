import { useState } from "react";
import { Package, Plus, Search, Tag, DollarSign, Barcode, Trash2 } from "lucide-react";
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

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  categoria: string;
  preco: number;
  unidade: string;
}

const initialProdutos: Produto[] = [
  {
    id: "1",
    codigo: "ZBL-001",
    nome: "Camisa Algodão Renda Zabelê",
    categoria: "Vestuário",
    preco: 129.90,
    unidade: "UN",
  },
  {
    id: "2",
    codigo: "ZBL-002",
    nome: "Bolsa Artesanal Tecido Nordestino",
    categoria: "Acessórios",
    preco: 89.00,
    unidade: "UN",
  },
  {
    id: "3",
    codigo: "ZBL-003",
    nome: "Chapéu de Palha Estilizado",
    categoria: "Acessórios",
    preco: 45.00,
    unidade: "UN",
  },
  {
    id: "4",
    codigo: "ZBL-004",
    nome: "Vestido Linho Bordado Manual",
    categoria: "Vestuário",
    preco: 249.00,
    unidade: "UN",
  },
];

export function ProdutosTab() {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Form states
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Vestuário");
  const [preco, setPreco] = useState("");
  const [unidade, setUnidade] = useState("UN");

  const filteredProdutos = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) return;

    const newProduto: Produto = {
      id: Date.now().toString(),
      codigo: codigo || `ZBL-${Math.floor(100 + Math.random() * 900)}`,
      nome,
      categoria: categoria || "Geral",
      preco: parseFloat(preco),
      unidade: unidade || "UN",
    };

    setProdutos([newProduto, ...produtos]);
    setCodigo("");
    setNome("");
    setPreco("");
    setCategoria("Vestuário");
    setUnidade("UN");
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-400/60" />
          <Input
            placeholder="Buscar por código, nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/40 border-emerald-500/30 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-400"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-900/40 cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Cadastrar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b1310] border-emerald-500/30 text-emerald-100 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-emerald-400 font-mono flex items-center gap-2">
                <Package className="h-5 w-5" /> Novo Produto
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduto} className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Código Produto
                  </label>
                  <Input
                    placeholder="ZBL-005"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Unidade
                  </label>
                  <Input
                    placeholder="UN / KG / CX"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-emerald-400 font-mono mb-1 block">
                  Nome do Produto *
                </label>
                <Input
                  required
                  placeholder="Ex: Vestido Zabelê Verão"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Categoria
                  </label>
                  <Input
                    placeholder="Vestuário"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 font-mono mb-1 block">
                    Preço de Venda (R$) *
                  </label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="bg-black/60 border-emerald-500/30 text-emerald-100 focus:border-emerald-400"
                  />
                </div>
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
                  Salvar Produto
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProdutos.map((prod) => (
          <div
            key={prod.id}
            className="group bg-[#09120e]/80 border border-emerald-500/20 hover:border-emerald-400/40 rounded-xl p-5 backdrop-blur-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-emerald-500 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                  {prod.codigo}
                </span>
                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                  {prod.categoria}
                </Badge>
              </div>

              <h3 className="font-semibold text-emerald-100 text-base mt-2 mb-3 group-hover:text-emerald-300 transition-colors">
                {prod.nome}
              </h3>
            </div>

            <div className="pt-3 border-t border-emerald-500/10 flex justify-between items-center mt-2">
              <div>
                <span className="text-[10px] text-emerald-500 font-mono uppercase block">Preço</span>
                <span className="text-lg font-bold font-mono text-emerald-300">
                  R$ {prod.preco.toFixed(2)}
                </span>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(prod.id)}
                className="h-8 w-8 p-0 text-red-400/70 hover:text-red-300 hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredProdutos.length === 0 && (
          <div className="col-span-full text-center py-12 border border-dashed border-emerald-500/20 rounded-xl bg-black/30">
            <p className="text-emerald-500/60 font-mono text-sm">
              Nenhum produto cadastrado no catálogo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}