import React from "react";

interface Mascota {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const Adopta: React.FC = () => {
  const mascotas: Mascota[] = [
    {
      id: 1,
      nombre: "Luna",
      descripcion: "Cachorra muy cariñosa, ideal para familias con niños. Le gusta juagar",
      imagen: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600",
    },
    {
      id: 2,
      nombre: "Rocky",
      descripcion: "Perro adulto, tranquilo y obediente. Le encanta caminar.",
      imagen: "https://placedog.net/300/200",
    },
    {
      id: 3,
      nombre: "Milo",
      descripcion: "Gatito juguetón y curioso, se adapta fácilmente a las personas",
      imagen: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600",
  },
 
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-white fw-bold">Conoce a nuestras mascotas</h1>
      <div className="row g-4">
        {mascotas.map((m) => (
          <div className="col-md-4" key={m.id}>
            <div className="card shadow-sm h-100">
              <img src={m.imagen} className="card-img-top pet-image" alt={m.nombre} />
              <div className="card-body">
                <h5 className="card-title">{m.nombre}</h5>
                <p className="card-text">{m.descripcion}</p>
                <button className="btn btn-primary w-100">Adoptar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adopta;