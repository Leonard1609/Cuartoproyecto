// frontend/src/Votacion.jsx - Carga de datos y lógica de interacción con el backend (simulada)

import React, { useState, useEffect } from 'react';

// Datos de los partidos políticos para la simulación
const PARTIDOS_SIMULADOS = [
    { id: 'FP', nombre: 'Fuerza Popular', candidato: 'Keiko Fujimori', color: '#ff7f00' },
    { id: 'PL', nombre: 'Perú Libre', candidato: 'Vladimir Cerrón', color: '#dc3545' },
    { id: 'APP', nombre: 'Alianza para el Progreso', candidato: 'César Acuña', color: '#20c997' },
    { id: 'AP', nombre: 'Acción Popular', candidato: 'Alfredo Barnechea', color: '#007bff' },
    { id: 'RP', nombre: 'Renovación Popular', candidato: 'Rafael López Aliaga', color: '#6f42c1' },
    { id: 'JP', nombre: 'Juntos por el Perú', candidato: 'Verónika Mendoza', color: '#fd7e14' },
];

const Votacion = () => {
  const [opciones, setOpciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [haVotado, setHaVotado] = useState(false);

  // 1. useEffect: Simula la carga de datos de las opciones de la API de Java
  useEffect(() => {
    // BUENA PRÁCTICA: fetch para obtener opciones de la API
    // fetch('/api/votaciones/opciones').then(res => res.json()).then(data => setOpciones(data));
    
    // SIMULACIÓN: carga los datos simulados tras un retraso
    setTimeout(() => {
        setOpciones(PARTIDOS_SIMULADOS.map(p => ({...p, votos: 0}))); // votos: 0 inicial
        setCargando(false);
    }, 1000);
  }, []);


  // 2. Manejo del voto: Simula el envío al backend de Java
  const manejarVoto = async (idOpcion) => {
    if (haVotado) return;

    // BUENA PRÁCTICA: Simulación de una llamada POST al backend
    /* try {
        const response = await fetch('/api/voto', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // En un proyecto real, se enviaría el token de usuario aquí
                'Authorization': `Bearer ${localStorage.getItem('userToken')}` 
            },
            body: JSON.stringify({ opcionId: idOpcion })
        });

        if (response.ok) {
            setHaVotado(true);
            // El backend DEBE asegurar que no haya doble voto por DNI
        } else {
            alert('Error al registrar el voto. Intente de nuevo.');
        }
    } catch (error) {
        alert('Error de conexión con el servidor. Intente de nuevo.');
    }
    */
    
    // SIMULACIÓN PURA DE ÉXITO
    setHaVotado(true);
  };
  
  if (cargando) {
      return <div className="cargando-mensaje">Cargando opciones electorales...</div>;
  }
  
  // URL de placeholder para la imagen (simulación de logotipo del partido)
  const getImageUrl = (id) => `https://via.placeholder.com/150/007bff/FFFFFF?text=${id}`;


  return (
    <div className="contenedor-votacion">
      <h1>🗳️ Cédula de Votación Presidencial (2026)</h1>
      
      {haVotado && (
        <div className="mensaje-confirmacion">
          ¡Voto registrado y enviado a la API de Java! Su DNI ha sido marcado como votante.
        </div>
      )}

      <div className="lista-opciones">
        {opciones.map(opcion => (
          <div key={opcion.id} className="tarjeta-opcion">
            <img src={getImageUrl(opcion.id)} alt={`Logo de ${opcion.nombre}`} className="logo-partido" />
            
            <h2 style={{ color: opcion.color }}>{opcion.nombre} ({opcion.id})</h2>
            <p>Candidato: **{opcion.candidato}**</p>

            <button 
              onClick={() => manejarVoto(opcion.id)} 
              disabled={haVotado}
              className={haVotado ? 'btn-votado' : 'btn-votar'}
            >
              {haVotado ? 'Voto Emitido' : 'VOTAR'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Votacion;