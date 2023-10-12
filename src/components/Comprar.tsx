import { useContext } from "react";
import { CartContext } from "../context/CarritoContext";
import "../styles/comprar.scss";
import { MercadoPagoBtn } from "./MercadoPagoBtn";

export const Comprar = () => {
  const { calcularTotal, carrito } = useContext(CartContext);
  return (
    <div className='comprar'>
      <h3 className='title'>Detalle de la compra</h3>
      <div className='detalle-compra'>
        {carrito.map((producto) => (
          <div key={producto.id} className='producto'>
            <div className='caracteristicas'>
              <h3 className='nombre'>
                <span> x{producto.cantidad}</span>
                {producto.nombre}
              </h3>

              <h3 className='precio'>
                ${producto.precio}
                <span> (x unidad)</span>
              </h3>
            </div>
            <img src={producto.imagenes[0]} />
          </div>
        ))}
        <h3 className='total'>
          Total: <span>${calcularTotal()}</span>
        </h3>
      </div>
      <div className='metodos-pago'>
        <h3>Seleccione un método de pago</h3>
        <MercadoPagoBtn />
        <button>Bancolombia</button>
      </div>
    </div>
  );
};
