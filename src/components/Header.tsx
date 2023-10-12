import "../styles/header.scss";
import logo from "../assets/logoWines.png";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { handleSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  return (
    <header>
      <img src={logo} />
      <span>Ésta página no es real, es solo una DEMO</span>
      <div>
        <ul>
          <motion.li
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.5, color: "#0718FF" }}
          >
            <i className='bi bi-house-door-fill' />
          </motion.li>
          <li>Element</li>
          <li>Element</li>
        </ul>
        <input onChange={(e) => handleSearch(e.target.value)} type='text' />
      </div>
    </header>
  );
};
