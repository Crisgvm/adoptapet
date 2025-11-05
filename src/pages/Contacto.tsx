import React, { useState } from "react";
import axios from "axios"; // Librería para realizar peticiones HTTP al backend

// Declara un componente funcional llamado Contacto, significa React Functional Component, y le dice a TypeScript que Contacto es un componente de React.
const Contacto: React.FC = () => {
  // useState permite manejar valores dinámicos, como los campos del formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estados para manejar los mensajes de error
  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  // Estado para mostrar mensajes de confirmación o error general del envío
  const [estadoEnvio, setEstadoEnvio] = useState("");

  // ---------------- VALIDACIÓN DEL FORMULARIO ----------------
  const validarFormulario = () => {
    const nuevosErrores = { nombre: "", email: "", mensaje: "" };

    // Validación del nombre
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede estar vacío.";
    }

    // Validación del email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = "Formato de email no válido.";
    }

    // Validación del mensaje (mínimo y máximo)
    if (!mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje no puede estar vacío.";
    } else if (mensaje.length < 10) {
      nuevosErrores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    } else if (mensaje.length > 200) {
      nuevosErrores.mensaje = "El mensaje no puede superar los 200 caracteres.";
    }

    setErrores(nuevosErrores);
    return nuevosErrores;
  };

  // ---------------- FUNCIÓN DE ENVÍO ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    const nuevosErrores = validarFormulario(); // Ejecuta la validación

    // Verifica si hay errores antes de enviar
    if (nuevosErrores.nombre || nuevosErrores.email || nuevosErrores.mensaje) {
      setEstadoEnvio("Por favor corrige los errores antes de enviar.");
      return;
    }

    try {
      // Si no hay errores, se envían los datos al microservicio Spring Boot
      const response = await axios.post("http://localhost:8080/contacto/guardar", {
        nombre,
        email,
        mensaje,
      });

      // Si el servidor responde correctamente
      if (response.status === 200 || response.status === 201) {
        setEstadoEnvio("✅ Mensaje enviado correctamente.");
        setNombre("");
        setEmail("");
        setMensaje("");
        setErrores({ nombre: "", email: "", mensaje: "" }); // Limpia errores
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setEstadoEnvio("❌ Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
    }
  };

  // ---------------- DESHABILITAR BOTÓN ----------------
  const botonDeshabilitado =
    !nombre.trim() ||
    !email.trim() ||
    !mensaje.trim() ||
    !!errores.nombre ||
    !!errores.email ||
    !!errores.mensaje;

  // ---------------- INTERFAZ ----------------
  return (
    <div className="main-content">
      <h1 className="text-white fw-bold display-5 mb-3">Contacto</h1>
      <p className="lead text-white mb-4">
        Completa el formulario y nos pondremos en contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-white">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              validarFormulario();
            }}
          />
          {errores.nombre && <p className="text-danger mt-1">{errores.nombre}</p>}
        </div>

        {/* Campo Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validarFormulario();
            }}
          />
          {errores.email && <p className="text-danger mt-1">{errores.email}</p>}
        </div>

        {/* Campo Mensaje */}
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label text-white">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            className="form-control"
            value={mensaje}
            onChange={(e) => {
              setMensaje(e.target.value);
              validarFormulario();
            }}
            rows={4}
          ></textarea>
          {errores.mensaje && <p className="text-danger mt-1">{errores.mensaje}</p>}
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn btn-light w-100" disabled={botonDeshabilitado}>
          Enviar
        </button>
      </form>

      {/* Mensaje general de envío */}
      {estadoEnvio && <p className="text-white mt-3">{estadoEnvio}</p>}
    </div>
  );
};

export default Contacto;