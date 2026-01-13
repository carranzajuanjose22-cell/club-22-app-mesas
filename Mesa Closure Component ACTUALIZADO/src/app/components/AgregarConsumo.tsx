import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export interface ItemConsumo {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface AgregarConsumoProps {
  onAgregar: (item: Omit<ItemConsumo, "id">) => void;
  disabled?: boolean;
}

export function AgregarConsumo({ onAgregar, disabled }: AgregarConsumoProps) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("1");

  const handleAgregar = () => {
    if (!nombre || !precio || !cantidad) return;

    onAgregar({
      nombre,
      precio: parseFloat(precio),
      cantidad: parseInt(cantidad),
    });

    // Resetear formulario
    setNombre("");
    setPrecio("");
    setCantidad("1");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAgregar();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Agregar Consumo
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm mb-2 text-gray-700 font-medium">Producto/Bebida</label>
          <Input
            type="text"
            placeholder="Ej: Vino Malbec Reserva"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-xl h-12 px-4 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-700 font-medium">Precio ($)</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-xl h-12 px-4 transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-700 font-medium">Cantidad</label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              className="border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 rounded-xl h-12 px-4 transition-all duration-200 shadow-sm hover:shadow-md"
            />
            <Button
              onClick={handleAgregar}
              disabled={disabled || !nombre || !precio || !cantidad}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}