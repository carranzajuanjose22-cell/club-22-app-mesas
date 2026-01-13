import { useState, useEffect } from "react";
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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 text-black">
          <Label htmlFor="nombre">Producto / Bebida</Label>
          <select 
            id="nombre"
            value={nombre} 
            onChange={(e) => manejarCambioBebida(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black focus:ring-2 focus:ring-red-600 outline-none"
          >
            <option value="">Seleccionar...</option>
            {catalogo.map(b => <option key={b.nombre} value={b.nombre}>{b.nombre}</option>)}
          </select>
        </div>
        <div className="space-y-2 text-black">
          <Label>Precio ($)</Label>
          <Input type="number" value={precio} readOnly className="text-black bg-gray-50 font-bold" />
        </div>
        <div className="space-y-2 text-black">
          <Label>Cantidad</Label>
          <div className="flex gap-2">
            <Input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} min="1" className="text-black" />
            <Button type="submit" className="bg-red-600 text-white hover:bg-red-700 font-bold">AGREGAR</Button>
          </div>
        </div>
      </div>
    </form>
  );
}