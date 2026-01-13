import { Wine } from "lucide-react";

// Cambiamos los nombres para que coincidan con App.tsx
interface MesaSelectorProps {
  seleccionada: number | null;
  alSeleccionar: (mesa: number) => void;
}

export function MesaSelector({ seleccionada, alSeleccionar }: MesaSelectorProps) {
  const mesas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 font-bold text-black">
        <Wine className="w-5 h-5 text-red-600" />
        Seleccionar Mesa
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {mesas.map((mesa) => (
          <button
            key={mesa}
            onClick={() => alSeleccionar(mesa)} // Usamos el nombre corregido
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              ${
                seleccionada === mesa // Usamos el nombre corregido
                  ? "bg-red-600 text-white border-red-600 scale-105"
                  : "bg-white text-gray-800 border-gray-300 hover:border-red-600 hover:text-red-600"
              }
            `}
          >
            <div className="text-center font-bold">
              <div className="text-[10px] opacity-70 mb-1 uppercase tracking-wider">Mesa</div>
              <div className="text-lg">{mesa}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}