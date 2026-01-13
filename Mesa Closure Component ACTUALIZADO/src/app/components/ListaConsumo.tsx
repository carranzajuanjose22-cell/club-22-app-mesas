import { Trash2, ShoppingBag } from "lucide-react";
import { ItemConsumo } from "./AgregarConsumo";

interface ListaConsumoProps {
  items: ItemConsumo[];
  onEliminar: (id: string) => void;
}

export function ListaConsumo({ items, onEliminar }: ListaConsumoProps) {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-4">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-lg text-gray-500 mb-2">No hay items agregados aún</p>
        <p className="text-sm text-gray-400">Agrega productos para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-red-500 to-red-700 p-2.5 rounded-xl shadow-lg">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Consumo de la Mesa
        </h3>
      </div>
      <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-gray-700 font-semibold">Producto</th>
                <th className="px-6 py-4 text-right text-sm text-gray-700 font-semibold">Precio</th>
                <th className="px-6 py-4 text-center text-sm text-gray-700 font-semibold">Cant.</th>
                <th className="px-6 py-4 text-right text-sm text-gray-700 font-semibold">Subtotal</th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gradient-to-r hover:from-red-50/50 hover:to-transparent transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{item.nombre}</td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                      ${item.precio.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50 text-red-700 px-4 py-1.5 rounded-xl text-sm font-semibold min-w-[3rem]">
                      {item.cantidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onEliminar(item.id)}
                      className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-xl transition-all duration-200 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-6 flex justify-between items-center">
          <span className="text-xl font-semibold tracking-wide">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-sm opacity-75">$</span>
            <span className="text-3xl font-bold tracking-tight">{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}