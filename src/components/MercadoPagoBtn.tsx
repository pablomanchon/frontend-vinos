import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useContext, useEffect, useState } from "react";
import api from "../api/vinosAPI";
import { CartContext } from "../context/CarritoContext";

export const MercadoPagoBtn = () => {
  initMercadoPago("APP_USR-bbc39a99-987f-423f-93ee-5c155dc9b1b6");

  const [preferenceId, setPreferenceId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { calcularTotal } = useContext(CartContext);

  useEffect(() => {
    const total = calcularTotal();
    setLoading(true);
    api
      .post(
        "https://backend-vinos-production.up.railway.app/mercado-pago/crear-preferencia",
        { total }
      )
      .then((res) => {
        setPreferenceId(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className='spinner-border text-primary m-auto' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      ) : (
        <Wallet locale='es-AR' initialization={{ preferenceId }} />
      )}
    </>
  );
};
