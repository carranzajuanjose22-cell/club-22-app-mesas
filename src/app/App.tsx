import React, { useState } from "react";
import { MesaSelector } from "./components/MesaSelector";
import { AgregarConsumo, type ItemConsumo } from "./components/AgregarConsumo";
import { ListaConsumo } from "./components/ListaConsumo";
import { TicketImpresion } from "./components/TicketImpresion";
import { AdminBebidas } from "./components/AdminBebidas";
import { Button } from "./components/ui/button";
import { Settings, Wine, X } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-red-50 text-black font-sans">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl" />
      </div>

      <header className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl border-b-4 border-red-600">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 rounded-2xl"></div>
                  <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <Wine className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">CLUB 22</h1>
                  <p className="text-red-500 text-sm mt-1 font-medium tracking-wide">
                    Sistema de Gestión de Mesas
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Mesas Activas</p>
                  <p className="text-2xl font-bold">{mesaSeleccionada ? 1 : 0}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Cierres Hoy</p>
                  <p className="text-2xl font-bold">{registros.length}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVerConfiguracion(!verConfiguracion)}
            className="text-gray-600 hover:text-red-600"
          >
            {verConfiguracion ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cerrar configuración
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </>
            )}
          </Button>
        </div>

        {verConfiguracion && <AdminBebidas />}
        
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <MesaSelector 
            seleccionada={mesaSeleccionada} 
            alSeleccionar={(mesa) => {
              setMesaSeleccionada(mesa);
              setTicketCierre(null); 
              setVerConfiguracion(false); 
            }} 
          />
        </div>

        {mesaSeleccionada !== null && !verConfiguracion && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50/60 to-white rounded-2xl p-6 sm:p-8 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-red-100 shadow-sm">
                  <span className="text-sm text-gray-600">Mesa seleccionada</span>
                  <span className="text-2xl font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1 shadow-inner">
                    {mesaSeleccionada}
                  </span>
                </div>
              </div>
              <AgregarConsumo onAgregar={agregarNuevoConsumo} />
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ListaConsumo items={consumosActuales} onEliminar={eliminarConsumo} />
            </div>
            {consumosActuales.length > 0 && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button 
                  onClick={() => setMostrarConfirmacion(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  CERRAR MESA
                </Button>
              </div>
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
          <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-gray-900 to-black text-white px-6 sm:px-8 py-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              <div className="relative flex items-center gap-3">
                <h3 className="text-xl font-semibold">Últimos cierres registrados</h3>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {registros.slice(-5).reverse().map((registro, index) => (
                <div
                  key={registro.id}
                  className="group flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white hover:from-red-50 hover:to-white rounded-2xl border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl px-5 py-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <div className="text-xs opacity-90 mb-0.5">Mesa</div>
                      <div className="text-xl font-bold">{registro.mesa}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        {registro.fecha.toLocaleString("es-AR")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {registro.items.length} productos
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Total</div>
                    <div className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                      ${registro.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
      </main>
    </div>
  );
}