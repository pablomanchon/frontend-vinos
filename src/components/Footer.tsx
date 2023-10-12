import "../styles/footer.scss";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer>
      <span>by Pablo Manchon</span>
      <div>
        <a href='https://portafolio-one-murex.vercel.app/'>
          <motion.h3 whileHover={{ scale: 1.2 }}>Contact me!</motion.h3>
        </a>
      </div>
    </footer>
  );
};
