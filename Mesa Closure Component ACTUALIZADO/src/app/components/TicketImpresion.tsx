import { useRef } from "react";
import { X, Printer, Check } from "lucide-react";
import { ItemConsumo } from "./AgregarConsumo";
import { Button } from "@/app/components/ui/button";

interface TicketImpresionProps {
  mesa: number;
  items: ItemConsumo[];
  fecha: Date;
  onCerrar: () => void;
}

export function TicketImpresion({ mesa, items, fecha, onCerrar }: TicketImpresionProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleImprimir = () => {
    const contenido = ticketRef.current;
    if (!contenido) return;

    const ventanaImpresion = window.open("", "", "width=400,height=600");
    if (!ventanaImpresion) return;

    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Ticket - Mesa ${mesa}</title>
          <style>
            body {
              font-family: monospace;
              margin: 20px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              border-bottom: 2px dashed #000;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }
            .header h1 {
              font-size: 24px;
              margin: 0;
              font-weight: bold;
            }
            .info {
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px dashed #000;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }
            th {
              text-align: left;
              border-bottom: 1px solid #000;
              padding: 5px 0;
            }
            td {
              padding: 5px 0;
            }
            .total {
              border-top: 2px solid #000;
              padding-top: 10px;
              margin-top: 10px;
              font-size: 16px;
              font-weight: bold;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px dashed #000;
            }
          </style>
        </head>
        <body>
          ${contenido.innerHTML}
        </body>
      </html>
    `);

    ventanaImpresion.document.close();
    ventanaImpresion.focus();
    
    setTimeout(() => {
      ventanaImpresion.print();
      ventanaImpresion.close();
    }, 250);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-300">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-black text-white p-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
              <Check className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-semibold">Ticket de Mesa</h2>
          </div>
          <button
            onClick={onCerrar}
            className="text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 transform hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div ref={ticketRef} className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 border-2 border-dashed border-gray-300">
            <div className="header">
              <h1>CLUB 22</h1>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>Vinería</p>
            </div>

            <div className="info">
              <p>
                <strong>Mesa:</strong> {mesa}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {fecha.toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              <p>
                <strong>Hora:</strong>{" "}
                {fecha.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th style={{ textAlign: "right" }}>Cant.</th>
                  <th style={{ textAlign: "right" }}>Precio</th>
                  <th style={{ textAlign: "right" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td style={{ textAlign: "right" }}>{item.cantidad}</td>
                    <td style={{ textAlign: "right" }}>${item.precio.toFixed(2)}</td>
                    <td style={{ textAlign: "right" }}>
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total">TOTAL: ${total.toFixed(2)}</div>

            <div className="footer">
              <p>¡Gracias por su visita!</p>
              <p style={{ fontSize: "10px", marginTop: "5px" }}>
                {fecha.toLocaleString("es-AR")}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleImprimir}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Printer className="w-5 h-5 mr-2" />
              Imprimir Ticket
            </Button>
            <Button
              onClick={onCerrar}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:bg-gray-100 h-12 rounded-xl transition-all duration-200"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}