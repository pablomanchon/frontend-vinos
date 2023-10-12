import { motion } from "framer-motion";
import { useState, useContext } from "react";
import fondoUva from "../../assets/fondoUva.png";
import { Vino } from "../../hooks/types";
import { CartContext } from "../../context/CarritoContext";

type VinoProps = {
  vino: Vino;
};

export const Card = ({ vino }: VinoProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const uvaAnimation = {
    rotate: isSelected ? -15 : -10,
    y: isSelected ? -120 : -95,
    x: isSelected ? 250 : 120,
    scale: isSelected ? 1.5 : 1,
    transition: {
      duration: 5,
    },
  };

  const wineAnimation = {
    rotate: isSelected ? 3 : 0,
    scale: isSelected ? 1.07 : 1,
    transition: {
      duration: 3,
    },
  };

  const { agregarAlcarrito } = useContext(CartContext);

  return (
    <div key={vino.id} className='vino'>
      <motion.img
        style={{ y: -95, x: 120, rotate: -10 }}
        animate={uvaAnimation}
        className='uva-img'
        src={fondoUva}
      />
      <motion.img
        className='vino-img'
        onClick={() => setIsSelected(!isSelected)}
        onHoverStart={() => setIsSelected(true)}
        onHoverEnd={() => setIsSelected(false)}
        animate={wineAnimation}
        src={vino.imagenes[0]}
      />
      <div className='caracteristicas'>
        <h3 className='precio'>${vino.precio}</h3>
        <h3 className='nombre'>{vino.nombre}</h3>
        {vino.uva.length > 0 && (
          <div className='tipos-uva'>
            {vino.uva.map((uva, i) => (
              <h3 key={i}>{uva}</h3>
            ))}
          </div>
        )}
        <button
          className='btn-agregar'
          onClick={() => agregarAlcarrito(vino, 1)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};
