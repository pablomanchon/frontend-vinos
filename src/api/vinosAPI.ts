import axios from "axios";
import { Vino } from "../hooks/types";

const api = axios.create({
  baseURL: "https://backend-vinos-production.up.railway.app",
});

export const getVinos = async (): Promise<Vino[]> => {
  const response = await api.get("/vinos");
  return response.data;
};

export default api;
