import { useState, useContext } from "react";
import "../../styles/carrito.scss";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export const Carrito = () => {
  const [isClose, setisClose] = useState(true);

  const navigate = useNavigate();

  const useCart = useContext(CartContext);

  return (
    <>
      <motion.div
        initial={{ right: "-100%" }}
        animate={{
          right: isClose ? "-100%" : 0,
          transition: { type: "spring", damping: 18 },
        }}
        className='carrito'
      >
        <h3 className='titulo'>Carrito</h3>
        <AnimatePresence mode='popLayout'>
          <div className='productos-carrito'>
            {useCart.carrito.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className='producto-carrito'
              >
                <img className='imagen' src={product.imagenes[0]} />
                <h3 className='nombre'>{product.nombre}</h3>
                <h3 className='cantidad'>x{product.cantidad}</h3>
                <h3 className='precio'>
                  ${product.precio}
                  <span>(precio unidad)</span>
                </h3>
                <i
                  onClick={() => useCart.quitarDelCarrito(product)}
                  className='bi bi-x-circle-fill btn-quitar'
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
        {useCart.cantidadEnCarrito() > 0 ? (
          <div className='carrito-footer'>
            <h3 className='total'>Total: ${useCart.calcularTotal()}</h3>
            <button
              onClick={() => {
                navigate("/metodos-pago");
                setisClose(true);
              }}
              className='btn-comprar'
            >
              Comprar
            </button>
          </div>
        ) : (
          <span className='vacio-msg'>El carrito está vacio :(</span>
        )}
        <i
          onClick={() => setisClose(true)}
          className='bi bi-x-circle-fill btn-cerrar'
        />
      </motion.div>

      <button className='btn-carrito' onClick={() => setisClose(!isClose)}>
        <i className='bi bi-cart4' />
        <span className='cantidad'>{useCart.cantidadEnCarrito()}</span>
      </button>
    </>
  );
};
