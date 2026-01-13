import { useState } from "react";
import { MesaSelector } from "./components/MesaSelector";
import { AgregarConsumo, type ItemConsumo } from "./components/AgregarConsumo";
import { ListaConsumo } from "./components/ListaConsumo";
import { TicketImpresion } from "./components/TicketImpresion";
import { AdminBebidas } from "./components/AdminBebidas"; 
import { Button } from "./components/ui/button"; 
import { Settings, X } from "lucide-react"; 

export default function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null);
  const [consumos, setConsumos] = useState<Record<number, ItemConsumo[]>>({});
  const [mostrarTicket, setMostrarTicket] = useState(false);
  const [verConfiguracion, setVerConfiguracion] = useState(false); 

  const agregarNuevoConsumo = (nombre: string, precio: number, cantidad: number) => {
    if (mesaSeleccionada === null) return;
    const itemConId: ItemConsumo = {
      id: Math.random().toString(36).substr(2, 9),
      nombre, precio, cantidad,
    };
    setConsumos((prev) => ({
      ...prev,
      [mesaSeleccionada]: [...(prev[mesaSeleccionada] || []), itemConId],
    }));
  };

  const eliminarConsumo = (id: string) => {
    if (mesaSeleccionada === null) return;
    setConsumos((prev) => ({
      ...prev,
      [mesaSeleccionada]: prev[mesaSeleccionada].filter((item) => item.id !== id),
    }));
  };

  const consumosActuales = mesaSeleccionada !== null ? consumos[mesaSeleccionada] || [] : [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-black font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="relative text-center space-y-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setVerConfiguracion(!verConfiguracion)}
            className="absolute right-0 top-0 text-gray-400 hover:text-red-600"
          >
            {verConfiguracion ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
          </Button>
          <h1 className="text-5xl font-black italic tracking-tighter">CLUB 22</h1>
          <p className="text-gray-500 uppercase text-xs tracking-[0.3em]">Gestión de Comandas</p>
        </header>

        {verConfiguracion && <AdminBebidas />}
        
        <MesaSelector 
          seleccionada={mesaSeleccionada} 
          alSeleccionar={(mesa) => {
            setMesaSeleccionada(mesa);
            setMostrarTicket(false); 
            setVerConfiguracion(false); 
          }} 
        />

        {mesaSeleccionada !== null && !verConfiguracion && (
          <div className="space-y-6 border-t border-gray-300 pt-6">
            <h2 className="text-3xl font-bold text-red-600 underline">Mesa {mesaSeleccionada}</h2>
            <AgregarConsumo onAgregar={agregarNuevoConsumo} />
            <ListaConsumo items={consumosActuales} onEliminar={eliminarConsumo} />
            {consumosActuales.length > 0 && (
              <Button 
                onClick={() => setMostrarTicket(true)}
                className="w-full bg-black text-white h-16 text-xl font-black"
              >
                CERRAR MESA Y GENERAR TICKET
              </Button>
            )}
          </div>
        )}

        {mostrarTicket && mesaSeleccionada !== null && (
          <TicketImpresion
            mesa={mesaSeleccionada}
            items={consumosActuales}
            fecha={new Date()}
            onCerrar={() => setMostrarTicket(false)}
          />
        )}
      </div>
    </div>
  );
}