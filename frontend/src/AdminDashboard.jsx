// frontend/src/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';

// Datos de los partidos políticos (usados para la visualización)
const PARTIDOS_SIMULADOS = [
    { id: 'FP', nombre: 'Fuerza Popular', candidato: 'Keiko Fujimori', color: '#ff7f00' },
    { id: 'PL', nombre: 'Perú Libre', candidato: 'Vladimir Cerrón', color: '#dc3545' },
    { id: 'APP', nombre: 'Alianza para el Progreso', candidato: 'César Acuña', color: '#20c997' },
    { id: 'AP', nombre: 'Acción Popular', candidato: 'Alfredo Barnechea', color: '#007bff' },
    { id: 'RP', nombre: 'Renovación Popular', candidato: 'Rafael López Aliaga', color: '#6f42c1' },
    { id: 'JP', nombre: 'Juntos por el Perú', candidato: 'Verónika Mendoza', color: '#fd7e14' },
];

// Datos Simulados que serían GUARDADOS en el Backend (Java/Database)
const DATOS_VOTOS_SIMULADOS_DEL_BACKEND = [
    { id: 'FP', votos: 1550 },
    { id: 'PL', votos: 1200 },
    { id: 'APP', votos: 850 },
    { id: 'AP', votos: 600 },
    { id: 'RP', votos: 1000 },
    { id: 'JP', votos: 400 },
];

const AdminDashboard = () => {
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // BUENA PRÁCTICA: fetch al endpoint de la API de Java para obtener resultados
    // fetch('/api/admin/resultados-finales').then(res => res.json()).then(data => setResultados(data));
    
    // SIMULACIÓN: Carga los datos guardados en el "backend"
    setTimeout(() => {
        const votosMap = new Map(DATOS_VOTOS_SIMULADOS_DEL_BACKEND.map(item => [item.id, item.votos]));
        
        // Combina datos de partidos con los votos simulados
        const resultadosCombinados = PARTIDOS_SIMULADOS.map(partido => ({
            ...partido,
            votos: votosMap.get(partido.id) || 0, // Asegura que tenga el conteo de votos
        })).sort((a, b) => b.votos - a.votos); // Ordena por más votos

        setResultados(resultadosCombinados);
        setCargando(false);
    }, 1500);
  }, []);

  const totalVotos = resultados.reduce((sum, opcion) => sum + opcion.votos, 0);

  if (cargando) {
    return <div className="cargando-mensaje">Cargando resultados consolidados del sistema Java...</div>;
  }

  return (
    <div className="contenedor-admin">
      <h1>Panel de Administración: Resultados Nacionales 📊</h1>
      <p className="total-votos">TOTAL DE VOTOS REGISTRADOS: **{totalVotos.toLocaleString()}**</p>
      
      <div className="resultados-listado">
        {resultados.map((opcion, index) => {
          const porcentaje = totalVotos > 0 ? (opcion.votos / totalVotos) * 100 : 0;
          return (
            <div key={opcion.id} className="resultado-item">
              <span className="posicion">{index + 1}</span>
              <div className="info-partido">
                <h3 style={{ color: opcion.color }}>{opcion.nombre} ({opcion.id})</h3>
                <p>Candidato: {opcion.candidato}</p>
              </div>
              <div className="conteo-votos">
                <span className="votos-count">{opcion.votos.toLocaleString()} Votos</span>
                <span className="votos-porcentaje">{porcentaje.toFixed(2)}%</span>
              </div>
              <div className="barra-progreso-contenedor">
                <div 
                  className="barra-progreso"
                  style={{ width: `${porcentaje}%`, backgroundColor: opcion.color }}
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