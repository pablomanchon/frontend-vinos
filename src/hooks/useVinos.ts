import api from "../api/vinosAPI";
import { useQuery } from "@tanstack/react-query";
import { Vino } from "./types";

async function fetchVinos() {
  const { data } = await api.get<Vino[]>("vinos");
  return data;
}

export function useFetchVinos() {
  return useQuery(["vinos"], fetchVinos);
}
