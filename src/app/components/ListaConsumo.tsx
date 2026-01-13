import { Trash2 } from "lucide-react";
import { ItemConsumo } from "./AgregarConsumo";

interface ListaConsumoProps {
  items: ItemConsumo[];
  onEliminar: (id: string) => void;
}

export function ListaConsumo({ items, onEliminar }: ListaConsumoProps) {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No hay items agregados aún</p>
        <p className="text-sm mt-2">Agrega productos para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3>Consumo de la Mesa</h3>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600">Producto</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Precio</th>
              <th className="px-4 py-3 text-center text-sm text-gray-600">Cant.</th>
              <th className="px-4 py-3 text-right text-sm text-gray-600">Subtotal</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{item.nombre}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  ${item.precio.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {item.cantidad}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onEliminar(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-black text-white px-4 py-4 flex justify-between items-center">
          <span className="text-lg">Total</span>
          <span className="text-2xl">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
