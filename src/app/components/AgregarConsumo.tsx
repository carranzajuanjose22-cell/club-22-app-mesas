import { useState, useEffect } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { obtenerBebidas, type Bebida } from "../gestorBebidas";

export interface ItemConsumo {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface AgregarConsumoProps {
  onAgregar: (nombre: string, precio: number, cantidad: number) => void;
}

export function AgregarConsumo({ onAgregar }: AgregarConsumoProps) {
  const [catalogo, setCatalogo] = useState<Bebida[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("1");

  useEffect(() => {
    setCatalogo(obtenerBebidas());
  }, []);

  const manejarCambioBebida = (valor: string) => {
    setNombre(valor);
    const seleccion = catalogo.find((b) => b.nombre === valor);
    if (seleccion) setPrecio(seleccion.precio.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre && precio && cantidad) {
      onAgregar(nombre, Number(precio), Number(cantidad));
      setNombre(""); setPrecio(""); setCantidad("1");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shadow-lg">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Agregar Consumo
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2 text-black">
          <Label htmlFor="nombre" className="text-sm text-gray-700 font-medium">
            Producto / Bebida
          </Label>
          <select
            id="nombre"
            value={nombre}
            onChange={(e) => manejarCambioBebida(e.target.value)}
            className="flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm text-black focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <option value="">Seleccionar...</option>
            {catalogo.map((b) => (
              <option key={b.nombre} value={b.nombre}>
                {b.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 text-black">
          <Label className="text-sm text-gray-700 font-medium">Precio ($)</Label>
          <Input
            type="number"
            value={precio}
            readOnly
            className="text-black bg-gray-50 font-bold h-12 rounded-xl border-2 border-gray-200"
          />
        </div>

        <div className="space-y-2 text-black">
          <Label className="text-sm text-gray-700 font-medium">Cantidad</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              className="text-black h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}