import React, { useRef } from "react";
import { X, Printer } from "lucide-react";
import { Button } from "./ui/button";

export function TicketImpresion({ mesa, items, fecha, onCerrar }: any) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const total = items.reduce((s: any, i: any) => s + (i.precio * i.cantidad), 0);
  
  // Formateo de fecha y hora similar al PDF 
  const fechaStr = fecha.toLocaleDateString('es-AR');
  const horaStr = fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleImprimir = () => {
    const contenido = ticketRef.current;
    if (!contenido) return;

    const ventana = window.open("", "", "width=400,height=600");
    if (!ventana) return;

    ventana.document.write(`
      <html>
        <head>
          <title>Ticket - Mesa ${mesa}</title>
          <style>
            body {
              font-family: monospace;
              margin: 20px;
              font-size: 12px;
            }
            .ticket {
              width: 80mm;
              margin: 0 auto;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }
            th {
              text-align: left;
              border-bottom: 1px solid #000;
              padding: 4px 0;
            }
            td { padding: 4px 0; }
            .total {
              border-top: 2px solid #000;
              padding-top: 8px;
              margin-top: 8px;
              font-size: 14px;
              font-weight: bold;
              text-align: right;
            }
            .footer {
              text-align: center;
              margin-top: 16px;
              padding-top: 8px;
              border-top: 1px dashed #000;
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${contenido.innerHTML}
          </div>
        </body>
      </html>
    `);

    ventana.document.close();
    ventana.focus();
    setTimeout(() => {
      ventana.print();
      ventana.close();
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 ticket-modal">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">PREVISTA TICKET</h2>
          <button onClick={onCerrar}><X /></button>
        </div>
        
        <div ref={ticketRef} className="font-mono text-[12px] border p-4 bg-white text-black ticket-print">
          {/* Encabezado con Fecha y Hora del PDF [cite: 12, 15] */}
          <div className="mb-4">
            <p>{fechaStr}, {horaStr}</p>
            <p>Mesa: {mesa}</p>
            <p>Fecha: {fechaStr}</p>
            <p>Hora: {horaStr}</p>
          </div>

          {/* Tabla de Productos  */}
          <table className="w-full mb-4 border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left">Producto</th>
                <th className="text-center">Cant.</th>
                <th className="text-right">Precio</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i: any, index: number) => (
                <tr key={index}>
                  <td className="text-left">{i.nombre}</td>
                  <td className="text-center">{i.cantidad}</td>
                  <td className="text-right">${i.precio.toFixed(2)}</td>
                  <td className="text-right">${(i.precio * i.cantidad).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan={3} className="text-right pt-2">TOTAL:</td>
                <td className="text-right pt-2">${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Pie de página según el PDF  */}
          <div className="text-center mt-6">
            <p className="font-bold">Ticket Mesa {mesa}</p>
            <div className="my-2">
              <h1 className="font-bold text-lg">CLUB 22</h1>
              <p>Vinería</p>
            </div>
            <p className="italic">¡Gracias por su visita!</p>
            <p className="text-[10px] mt-2">{new Date().toLocaleString()}</p>
          </div>
        </div>

        <Button onClick={handleImprimir} className="w-full mt-6 bg-red-600 text-white no-print">
          <Printer className="mr-2" /> IMPRIMIR
        </Button>
      </div>
    </div>
  );
}