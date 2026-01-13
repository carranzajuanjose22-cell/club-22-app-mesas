import { useState } from "react";
import { Wine, FileCheck, Clock, TrendingUp } from "lucide-react";
import { MesaSelector } from "@/app/components/MesaSelector";
import { AgregarConsumo, ItemConsumo } from "@/app/components/AgregarConsumo";
import { ListaConsumo } from "@/app/components/ListaConsumo";
import { TicketImpresion } from "@/app/components/TicketImpresion";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";

interface RegistroCierre {
  id: string;
  mesa: number;
  items: ItemConsumo[];
  fecha: Date;
  total: number;
}

export default function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number | null>(null);
  const [items, setItems] = useState<ItemConsumo[]>([]);
  const [ticketActual, setTicketActual] = useState<RegistroCierre | null>(null);
  const [registros, setRegistros] = useState<RegistroCierre[]>([]);

  const handleAgregarItem = (nuevoItem: Omit<ItemConsumo, "id">) => {
    const item: ItemConsumo = {
      ...nuevoItem,
      id: Date.now().toString() + Math.random().toString(36).substring(7),
    };
    setItems([...items, item]);
    toast.success(`${nuevoItem.nombre} agregado`, {
      description: "Item agregado al consumo de la mesa",
    });
  };

  const handleEliminarItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast.error("Item eliminado", {
      description: "Se eliminó el producto del consumo",
    });
  };

  const handleRegistrarCierre = () => {
    if (!mesaSeleccionada) {
      toast.error("Selecciona una mesa primero");
      return;
    }

    if (items.length === 0) {
      toast.error("Agrega al menos un item");
      return;
    }

    const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const nuevoCierre: RegistroCierre = {
      id: Date.now().toString(),
      mesa: mesaSeleccionada,
      items: [...items],
      fecha: new Date(),
      total,
    };

    // Guardar registro (aquí se conectaría con Supabase)
    setRegistros([...registros, nuevoCierre]);
    
    // Mostrar ticket
    setTicketActual(nuevoCierre);

    // Limpiar formulario
    setItems([]);
    setMesaSeleccionada(null);

    toast.success(`Cierre de Mesa ${mesaSeleccionada} registrado exitosamente`, {
      description: `Total: $${total.toFixed(2)}`,
    });
  };

  const handleCerrarTicket = () => {
    setTicketActual(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-red-50">
      <Toaster position="top-right" richColors />
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-900/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-2xl border-b-4 border-red-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDM2YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                <p className="text-red-500 text-sm mt-1 font-medium tracking-wide">Sistema de Gestión de Mesas</p>
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

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="w-7 h-7" />
                <h2 className="text-2xl font-semibold">Finalización de Mesa</h2>
              </div>
              {mesaSeleccionada && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                  <span className="text-sm">Mesa Seleccionada: <strong className="text-lg">{mesaSeleccionada}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Selector de Mesa */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <MesaSelector
                mesaSeleccionada={mesaSeleccionada}
                onMesaSelect={setMesaSeleccionada}
              />
            </div>

            {/* Agregar Consumo */}
            {mesaSeleccionada && (
              <div className="bg-gradient-to-br from-red-50/50 to-white rounded-2xl p-8 border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <AgregarConsumo
                  onAgregar={handleAgregarItem}
                  disabled={!mesaSeleccionada}
                />
              </div>
            )}

            {/* Lista de Consumo */}
            {mesaSeleccionada && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ListaConsumo items={items} onEliminar={handleEliminarItem} />
              </div>
            )}

            {/* Botón de Registro */}
            {mesaSeleccionada && items.length > 0 && (
              <div className="flex justify-end pt-6 border-t-2 border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                  onClick={handleRegistrarCierre}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 group"
                >
                  <FileCheck className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Registrar Cierre de Mesa
                </Button>
              </div>
            )}

            {/* Estado vacío */}
            {!mesaSeleccionada && (
              <div className="text-center py-20 animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6 shadow-lg">
                  <Wine className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-xl text-gray-500 mb-2 font-medium">Selecciona una mesa para comenzar</p>
                <p className="text-sm text-gray-400">Elige una mesa del selector superior</p>
              </div>
            )}
          </div>
        </div>

        {/* Registro de cierres recientes */}
        {registros.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-gray-900 to-black text-white px-8 py-5 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
              <div className="relative flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Últimos Cierres Registrados</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
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
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4" />
                          {registro.fecha.toLocaleString("es-AR")}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <TrendingUp className="w-3 h-3" />
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
          </div>
        )}
      </main>

      {/* Modal de Ticket */}
      {ticketActual && (
        <TicketImpresion
          mesa={ticketActual.mesa}
          items={ticketActual.items}
          fecha={ticketActual.fecha}
          onCerrar={handleCerrarTicket}
        />
      )}
    </div>
  );
}