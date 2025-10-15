import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Adopta from "./pages/Adopta";
import Login from "./pages/Login";
import Adopciones from "./pages/adopciones";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // para navegación interna

  // Verificar sesión guardada
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/"); // redirige al Home sin recargar la página
  };

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top w-100 shadow">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            AdoptaPet
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adopta">Adopta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adopciones">Adopciones</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>

              {/* Mostrar login o cerrar sesión según estado */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Ingresar</Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-light ms-2"
                    style={{ borderRadius: "20px", padding: "5px 15px" }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/adopta" element={<Adopta />} />
           <Route path="/adopciones" element={<Adopciones />} />
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={() => {
                  localStorage.setItem("isLoggedIn", "true");
                  setIsLoggedIn(true);
                  navigate("/"); // redirige al Home después del login
                }}
              />
            }
          />
        </Routes>
      </div>

      {/* FOOTER */}
      <footer className="footer text-center py-3 bg-primary text-white">
        © 2025 AdoptaPet - Todos los derechos reservados
      </footer>
    </div>
  );
}

export default App;