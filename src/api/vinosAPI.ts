import axios from "axios";
import { Vino } from "../hooks/types";

const api = axios.create({
  baseURL: "https://backend-vinos-production.up.railway.app",
});

export const getVinos = async (): Promise<Vino[]> => {
  const response = await api.get("/vinos").catch((err) => {
    console.log(err);
  });
  return response?.data;
};

export default api;
