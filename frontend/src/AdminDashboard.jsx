// frontend/src/AdminDashboard.jsx
import React from 'react';
import { useVoteContext } from './VoteContext';

const AdminDashboard = () => {
  const { totalVotos, resultados } = useVoteContext().getResults;

  return (
    <div className="contenedor-admin">
      <h1>Panel de Administración: Conteo Rápido de Votos 📊</h1>
      <p className="total-votos">TOTAL DE VOTOS REGISTRADOS: 
        <span className="count-value">{totalVotos.toLocaleString()}</span>
      </p>
      
      <div className="resultados-listado">
        {resultados.map((opcion, index) => {
          const barWidth = opcion.porcentaje > 0 && opcion.porcentaje < 1 ? 1 : opcion.porcentaje.toFixed(2);

          return (
            <div key={opcion.id} className="resultado-item">
              
              {/* Información del Partido (Columna 1) */}
              <div className="info-partido-container">
                <img src={opcion.logoUrl} alt={`Logo de ${opcion.nombre}`} className="logo-admin-partido" />
                <div className="info-partido">
                  <span className="posicion">{index + 1}.</span>
                  <h3 style={{ color: opcion.color }}>{opcion.nombre} ({opcion.id})</h3>
                  <p className="candidato-admin">Candidato: {opcion.candidato}</p>
                </div>
              </div>

              {/* Conteo de Votos (Columna 2) */}
              <div className="conteo-votos">
                <span className="votos-count">{opcion.votos.toLocaleString()} Votos</span>
                <span className="votos-porcentaje">{opcion.porcentaje.toFixed(2)}%</span>
              </div>

              {/* Barra de Progreso (Fila separada que abarca las columnas) */}
              <div className="barra-progreso-contenedor">
                <div 
                  className="barra-progreso"
                  style={{ width: `${barWidth}%`, backgroundColor: opcion.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default AdminDashboard;