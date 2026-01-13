import { Wine } from "lucide-react";

interface MesaSelectorProps {
  mesaSeleccionada: number | null;
  onMesaSelect: (mesa: number) => void;
}

export function MesaSelector({ mesaSeleccionada, onMesaSelect }: MesaSelectorProps) {
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shadow-lg">
          <Wine className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Seleccionar Mesa
        </h3>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {mesas.map((mesa) => (
          <button
            key={mesa}
            onClick={() => onMesaSelect(mesa)}
            className={`
              group relative p-6 rounded-2xl border-2 transition-all duration-300 transform
              ${
                mesaSeleccionada === mesa
                  ? "bg-gradient-to-br from-red-600 to-red-700 text-white border-red-600 scale-105 shadow-2xl shadow-red-500/50"
                  : "bg-white text-gray-800 border-gray-200 hover:border-red-500 hover:shadow-xl hover:scale-102 hover:-translate-y-1"
              }
            `}
          >
            <div className="text-center">
              <div className={`text-xs mb-2 transition-colors ${
                mesaSeleccionada === mesa ? "text-red-100" : "text-gray-500 group-hover:text-red-600"
              }`}>
                Mesa
              </div>
              <div className="text-2xl font-bold">{mesa}</div>
              {mesaSeleccionada === mesa && (
                <div className="absolute inset-0 rounded-2xl bg-white opacity-20 animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}