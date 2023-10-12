import { useContext, useEffect } from "react";
import "../../styles/vinos.scss";
import { Card } from "./Vino";
import { SearchContext } from "../../context/SearchContext";
import { getVinos } from "../../api/vinosAPI";

const vinosData2 = getVinos();
export const Vinos = () => {
  const { results, handleSearch } = useContext(SearchContext);
  useEffect(() => {
    vinosData2.then((res) => {
      localStorage.setItem("vinos", JSON.stringify(res));
      handleSearch("");
    });
  }, [vinosData2]);

  return (
    <div className='vinos'>
      {results?.map((vino) => (
        <Card key={vino.id} vino={vino} />
      ))}
    </div>
  );
};
