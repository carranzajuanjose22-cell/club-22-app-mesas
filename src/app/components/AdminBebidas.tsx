import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Trash2, Plus } from "lucide-react";
import { obtenerBebidas, guardarBebidas, type Bebida } from "../gestorBebidas";

export function AdminBebidas() {
  const [lista, setLista] = useState<Bebida[]>([]);
  const [nuevaBebida, setNuevaBebida] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    setLista(obtenerBebidas());
  }, []);

  const agregar = () => {
    if (nuevaBebida.nombre && nuevaBebida.precio) {
      const actualizada = [...lista, { nombre: nuevaBebida.nombre, precio: Number(nuevaBebida.precio) }];
      setLista(actualizada);
      guardarBebidas(actualizada);
      setNuevaBebida({ nombre: "", precio: "" });
    }
  };

  const eliminar = (nombre: string) => {
    const actualizada = lista.filter(b => b.nombre !== nombre);
    setLista(actualizada);
    guardarBebidas(actualizada);
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
      <h2 className="text-xl font-bold text-black border-b pb-2">Gestión de Precios</h2>
      
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Nombre" value={nuevaBebida.nombre} onChange={e => setNuevaBebida({...nuevaBebida, nombre: e.target.value})} />
        <Input type="number" placeholder="Precio" value={nuevaBebida.precio} onChange={e => setNuevaBebida({...nuevaBebida, precio: e.target.value})} />
        <Button onClick={agregar} className="col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold">
          <Plus className="w-4 h-4 mr-2" /> AÑADIR A LA CARTA
        </Button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {lista.map(b => (
          <div key={b.nombre} className="flex justify-between items-center bg-white p-2 rounded shadow-sm border">
            <span className="text-black font-medium">{b.nombre} - ${b.precio}</span>
            <Button variant="ghost" size="sm" onClick={() => eliminar(b.nombre)} className="text-red-500 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}