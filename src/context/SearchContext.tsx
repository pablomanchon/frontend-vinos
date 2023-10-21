import { createContext, useState } from "react";
import { Vino } from "../hooks/types";

interface searchContextProps {
  handleSearch(frase: string): Vino[];
  results: Vino[];
}

export const SearchContext = createContext<searchContextProps>(
  {} as searchContextProps
);
interface props {
  children: JSX.Element;
}
export const SearchProvider = ({ children }: props) => {
  const [results, setResults] = useState<Vino[]>([]);

  const handleSearch = (frase: string) => {
    const localStorageValue = localStorage.getItem("vinosVelasco");
    const vinosValue: Vino[] = localStorageValue
      ? JSON.parse(localStorageValue)
      : [];
    const searchResults: Vino[] = vinosValue.filter((vino) => {
      const nameIncludes = vino.nombre
        .toLowerCase()
        .includes(frase.toLowerCase());
      const uvaIncludes = vino.uva.some((uva) =>
        uva.toLowerCase().includes(frase.toLowerCase())
      );
      return nameIncludes || uvaIncludes;
    });
    setResults(searchResults);
    return vinosValue;
  };
  return (
    <SearchContext.Provider
      value={{
        handleSearch,
        results,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
