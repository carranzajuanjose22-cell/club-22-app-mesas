import { useRef } from "react";
import { X, Printer } from "lucide-react";
import { type ItemConsumo } from "./AgregarConsumo";
import { Button } from "./ui/button";

export function TicketImpresion({ mesa, items, fecha, onCerrar }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const total = items.reduce((s: any, i: any) => s + (i.precio * i.cantidad), 0);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">PREVISTA TICKET</h2>
          <button onClick={onCerrar}><X /></button>
        </div>
        <div ref={ref} className="font-mono text-sm border p-4">
          <h1 className="text-center font-bold text-xl border-b pb-2 mb-2">CLUB 22</h1>
          <p>Mesa: {mesa}</p>
          <p className="mb-4">Fecha: {fecha.toLocaleDateString()}</p>
          {items.map((i: any) => (
            <div key={i.id} className="flex justify-between">
              <span>{i.cantidad} {i.nombre}</span>
              <span>${(i.precio * i.cantidad).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-black mt-4 pt-2 text-right font-bold">
            TOTAL: ${total.toLocaleString()}
          </div>
        </div>
        <Button onClick={() => window.print()} className="w-full mt-6 bg-red-600 text-white">
          <Printer className="mr-2" /> IMPRIMIR
        </Button>
      </div>
    </div>
  );
}