import { useState } from "react";
import { MesaSelector } from "./components/MesaSelector";
import { AgregarConsumo, type ItemConsumo } from "./components/AgregarConsumo";
import { ListaConsumo } from "./components/ListaConsumo";
import { TicketImpresion } from "./components/TicketImpresion";
import { AdminBebidas } from "./components/AdminBebidas"; 
import { Button } from "./components/ui/button"; 
import { Settings, X } from "lucide-react"; 

interface RegistroCierre {
  id: string;
  mesa: number;
  items: ItemConsumo[];
  fecha: Date;
  total: number;
}

export default function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null);
  const [consumos, setConsumos] = useState<Record<number, ItemConsumo[]>>({});
  const [ticketCierre, setTicketCierre] = useState<RegistroCierre | null>(null);
  const [registros, setRegistros] = useState<RegistroCierre[]>([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
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

  const registrarCierre = (imprimirTicket: boolean) => {
    if (mesaSeleccionada === null || consumosActuales.length === 0) {
      setMostrarConfirmacion(false);
      return;
    }

    const total = consumosActuales.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const registro: RegistroCierre = {
      id: Date.now().toString(),
      mesa: mesaSeleccionada,
      items: [...consumosActuales],
      fecha: new Date(),
      total,
    };

    setRegistros((prev) => [...prev, registro]);
    setTicketCierre(imprimirTicket ? registro : null);

    setConsumos((prev) => {
      const actualizado = { ...prev };
      actualizado[mesaSeleccionada] = [];
      return actualizado;
    });

    setMesaSeleccionada(null);
    setMostrarConfirmacion(false);
  };

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
            setTicketCierre(null); 
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
                onClick={() => setMostrarConfirmacion(true)}
                className="w-full bg-black text-white h-16 text-xl font-black"
              >
                CERRAR MESA
              </Button>
            )}
          </div>
        )}

        {ticketCierre && (
          <TicketImpresion
            mesa={ticketCierre.mesa}
            items={ticketCierre.items}
            fecha={ticketCierre.fecha}
            onCerrar={() => setTicketCierre(null)}
          />
        )}

        {registros.length > 0 && (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-2">
            <h3 className="font-bold text-lg">Últimos cierres</h3>
            {registros.slice(-5).reverse().map((registro) => (
              <div
                key={registro.id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="font-bold text-red-600">Mesa {registro.mesa}</span>
                  <span>{registro.fecha.toLocaleString("es-AR")}</span>
                  <span>{registro.items.length} ítems</span>
                </div>
                <div className="font-semibold text-gray-900">
                  ${registro.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}

        {mostrarConfirmacion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-black">¿Imprimir ticket de cierre?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Puedes registrar el cierre sin imprimir o continuar para imprimir el ticket.
                  </p>
                </div>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={() => setMostrarConfirmacion(false)}
                >
                  <X />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => registrarCierre(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Sí, imprimir
                </Button>
                <Button
                  variant="outline"
                  onClick={() => registrarCierre(false)}
                  className="border-gray-300 text-black hover:bg-gray-50"
                >
                  No, solo cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}