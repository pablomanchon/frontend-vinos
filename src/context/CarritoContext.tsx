import { createContext, useState, useEffect } from "react";
import { Producto, Vino } from "../hooks/types";
import { toast } from "react-toastify";

interface cartContextProps {
  carrito: Producto[];
  agregarAlcarrito(vino: Vino, cantidad: number): void;
  quitarDelCarrito(vino: Vino): void;
  calcularTotal(): number;
  cantidadEnCarrito(): number;
  vaciarCarrito(): void;
  comprarCarrito(): void;
}

export const CartContext = createContext<cartContextProps>(
  {} as cartContextProps
);

interface props {
  children: JSX.Element;
}

const localStorageValue = localStorage.getItem("carrito");
const carritoValue = localStorageValue ? JSON.parse(localStorageValue) : [];

export const CartProvider = ({ children }: props) => {
  const [carrito, setCarrito] = useState<Producto[]>(carritoValue);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlcarrito = (vino: Vino, cantidad: number) => {
    const vinoAgregado = { ...vino, cantidad };
    const nuevoCarrito = [...carrito];

    const isInCarrito = nuevoCarrito.find((v) => vinoAgregado.id === v.id);

    isInCarrito
      ? (isInCarrito.cantidad += cantidad)
      : nuevoCarrito.push(vinoAgregado);

    setCarrito(nuevoCarrito);
    toast.success("Se ha agregado al carrito con exito!");
  };

  const quitarDelCarrito = (vino: Vino) => {
    const nuevoCarrito = [...carrito];

    const productoIndex = nuevoCarrito.findIndex((v) => v.id === vino.id);

    if (productoIndex !== -1) {
      const productoExistente = nuevoCarrito[productoIndex];

      if (productoExistente.cantidad === 1) {
        nuevoCarrito.splice(productoIndex, 1);
      } else {
        productoExistente.cantidad -= 1;
      }

      setCarrito(nuevoCarrito);
      toast.success("Se ha eliminado del carrito con exito!");
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, vino) => acc + vino.precio * vino.cantidad, 0);
  };

  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, vino) => acc + vino.cantidad, 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const comprarCarrito = () => {
    vaciarCarrito();
    toast.success("Compra realizada con exito!");
  };
  return (
    <CartContext.Provider
      value={{
        carrito,
        calcularTotal,
        agregarAlcarrito,
        quitarDelCarrito,
        cantidadEnCarrito,
        vaciarCarrito,
        comprarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
