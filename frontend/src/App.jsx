import { useState } from 'react';
import './App.css'; // Mantenemos la importación del CSS

function App() {
  // 1. Estado para las opciones de votación
  const [opciones, setOpciones] = useState([
    { id: 1, nombre: 'Candidato A', votos: 12 },
    { id: 2, nombre: 'Candidato B', votos: 8 },
    { id: 3, nombre: 'Candidato C', votos: 5 },
  ]);

  // 2. Estado para controlar si el usuario ya votó
  const [haVotado, setHaVotado] = useState(false);

  // Función que maneja el clic de votar
  const manejarVoto = (idOpcion) => {
    if (haVotado) {
      alert("¡Ya has votado! Gracias.");
      return;
    }

    // Lógica simulada de votación: incrementa los votos localmente
    const nuevasOpciones = opciones.map(opcion => {
      if (opcion.id === idOpcion) {
        return { ...opcion, votos: opcion.votos + 1 };
      }
      return opcion;
    });

    setOpciones(nuevasOpciones);
    setHaVotado(true); // Marca que el usuario ya votó
    
    // NOTA: Cuando implementes el backend con Java, aquí reemplazarás esta lógica
    // con una llamada a tu API usando fetch o axios.
  };

  // Calcula el total de votos para la barra de progreso
  const totalVotos = opciones.reduce((sum, opcion) => sum + opcion.votos, 0);

  return (
    <div className="contenedor-votacion">
      <h1>🗳️ Plataforma de Votación</h1>
      
      {haVotado && (
        <div className="mensaje-confirmacion">
          ¡Voto registrado! Puedes ver los resultados a continuación.
        </div>
      )}

      <div className="lista-opciones">
        {opciones.map(opcion => (
          <div key={opcion.id} className="tarjeta-opcion">
            <h2>{opcion.nombre}</h2>
            <p>Votos: **{opcion.votos}**</p>
            
            <div className="barra-progreso-contenedor">
              <div 
                className="barra-progreso"
                style={{ width: `${(opcion.votos / totalVotos) * 100}%` }}
              >
                {/* Muestra el porcentaje solo si hay votos */}
                {totalVotos > 0 ? `${((opcion.votos / totalVotos) * 100).toFixed(1)}%` : '0%'}
              </div>
            </div>

            <button 
              onClick={() => manejarVoto(opcion.id)} 
              disabled={haVotado}
              className={haVotado ? 'btn-votado' : 'btn-votar'}
            >
              {haVotado ? 'Ya Votaste' : 'Votar por ' + opcion.nombre.split(' ')[1]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;