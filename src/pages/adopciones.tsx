import React, { useState } from "react";

interface Animal {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
}

const Adopciones: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([
    { id: 1, nombre: "Luna", especie: "Perro", edad: 3 },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 2 },
  ]);

  const [nuevoAnimal, setNuevoAnimal] = useState<Omit<Animal, "id">>({
    nombre: "",
    especie: "",
    edad: 0,
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Agregar o actualizar animal
  const guardarAnimal = () => {
    if (!nuevoAnimal.nombre.trim() || !nuevoAnimal.especie.trim()) return;

    if (editId !== null) {
      // Editar
      setAnimales(
        animales.map((a) =>
          a.id === editId ? { ...a, ...nuevoAnimal } : a
        )
      );
      setEditId(null);
    } else {
      // Agregar
      const nuevo = { ...nuevoAnimal, id: Date.now() };
      setAnimales([...animales, nuevo]);
    }

    setNuevoAnimal({ nombre: "", especie: "", edad: 0 });
  };

  // Eliminar
  const eliminarAnimal = (id: number) => {
    setAnimales(animales.filter((a) => a.id !== id));
    if (editId === id) setEditId(null);
  };

  // Cargar para editar
  const editarAnimal = (animal: Animal) => {
    setEditId(animal.id);
    setNuevoAnimal({
      nombre: animal.nombre,
      especie: animal.especie,
      edad: animal.edad,
    });
  };

  return (
    <div className="adopciones-container">
      <h2>Lista de Animales</h2>

      {/* === LISTA DE ANIMALES === */}
      <div className="lista-animales">
        <ul className="list-group mb-4">
          {animales.map((a) => (
            <li
              key={a.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{a.nombre}</strong> ({a.especie}, {a.edad} años)
              </span>
              <div>
                <button
                  onClick={() => editarAnimal(a)}
                  className="btn btn-sm me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarAnimal(a.id)}
                  className="btn btn-sm"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
          {animales.length === 0 && (
            <li className="list-group-item text-muted">
              No hay animales registrados
            </li>
          )}
        </ul>
      </div>

      {/* === FORMULARIO === */}
      <div className="formulario-adopcion">
        <h3>{editId ? "Editar Animal" : "Agregar Nuevo Animal"}</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={nuevoAnimal.nombre}
          onChange={(e) =>
            setNuevoAnimal({ ...nuevoAnimal, nombre: e.target.value })
          }
          className="form-control"
        />

        <input
          type="text"
          placeholder="Especie"
          value={nuevoAnimal.especie}
          onChange={(e) =>
            setNuevoAnimal({ ...nuevoAnimal, especie: e.target.value })
          }
          className="form-control"
        />

        <input
            type="number"
            placeholder="Edad"
            value={nuevoAnimal.edad === 0 ? "" : nuevoAnimal.edad}
            onChange={(e) =>
                setNuevoAnimal({
                ...nuevoAnimal,
                edad: e.target.value === "" ? 0 : Number(e.target.value),
                })
            }
            className="form-control mb-2"
        />

        <button onClick={guardarAnimal} className="btn btn-primary w-100">
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default Adopciones;