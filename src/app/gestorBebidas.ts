export interface Bebida {
  nombre: string;
  precio: number;
}

const NOMBRE_KEY = "club22_bebidas";

const BEBIDAS_POR_DEFECTO: Bebida[] = [
  { nombre: "Coca Cola", precio: 1500 },
  { nombre: "Cerveza Quilmes", precio: 2500 },
  { nombre: "Agua Mineral", precio: 1200 },
  { nombre: "Fernet Branca", precio: 4500 }
];

export const obtenerBebidas = (): Bebida[] => {
  if (typeof window === "undefined") return BEBIDAS_POR_DEFECTO;
  const guardadas = localStorage.getItem(NOMBRE_KEY);
  return guardadas ? JSON.parse(guardadas) : BEBIDAS_POR_DEFECTO;
};

export const guardarBebidas = (nuevasBebidas: Bebida[]) => {
  localStorage.setItem(NOMBRE_KEY, JSON.stringify(nuevasBebidas));
};