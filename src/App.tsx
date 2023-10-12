import { Vinos } from "./components/Vinos/Vinos";
import "./styles/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { Carrito } from "./components/Carrito/Carrito";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/CarritoContext";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./context/SearchContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Comprar } from "./components/Comprar";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <main>
            <ToastContainer
              position='top-left'
              theme='dark'
              autoClose={1000}
              limit={2}
              bodyStyle={{ zIndex: 2 }}
            />
            <SearchProvider>
              <>
                <Header />
                <Routes>
                  <Route path='/' element={<Vinos />} />
                  <Route path='/metodos-pago' element={<Comprar />} />
                </Routes>
              </>
            </SearchProvider>
            <Carrito />
            <Footer />
          </main>
        </CartProvider>
      </Router>
    </>
  );
}

export default App;
