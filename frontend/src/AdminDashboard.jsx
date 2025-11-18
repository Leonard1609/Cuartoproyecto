// frontend/src/AdminDashboard.jsx
import React, { useState } from 'react';
import { useVoteContext } from './VoteContext';

const AdminDashboard = () => {
    // 1. Hook para acceder a las funciones del contexto (getResults)
    const { getResults } = useVoteContext();
    
    // 2. Estados para la UI
    const [viewType, setViewType] = useState('presidencial'); // Estado para seleccionar la vista (presidencial/regional)

    // 3. Lógica para las nuevas funciones de administración (Simuladas)
    const handleCargarDataset = () => {
        // En un entorno real, aquí se llamaría a una API para subir un archivo o URL.
        alert('Simulando la carga de un nuevo Dataset (¡Esta función requiere lógica backend real!)');
        console.log('Dataset cargado (simulación)');
    };

    const handleLimpiarDataset = () => {
        // En un entorno real, esto enviaría una solicitud de borrado de datos.
        if (window.confirm('ADVERTENCIA: ¿Estás seguro de que quieres LIMPIAR TODOS los datos de votación? Esta acción es irreversible.')) {
            // Aquí llamarías a una función del contexto o API para limpiar los votos.
            alert('Simulando la limpieza total del Dataset.');
            console.log('Dataset limpiado (simulación)');
        }
    };

    // Obtener los resultados basados en el selector de vista
    const { totalVotos, resultados } = getResults[viewType];
    const tituloDashboard = viewType === 'presidencial' ? 'Presidenciales' : 'Regionales';

    return (
        <div className="contenedor-admin">
            <h1>Panel de Administración: Conteo Rápido de Votos 📊</h1>

            {/* 🔑 CAMBIO 1: Usar la clase .navegacion-admin para los estilos responsivos */}
            <div className="navegacion-admin"> 
                {/* Botones de Resultados */}
                <button 
                    onClick={() => setViewType('presidencial')}
                    className={`btn-navegacion ${viewType === 'presidencial' ? 'active' : ''}`}
                >
                    Resultados Presidenciales
                </button>
                <button 
                    onClick={() => setViewType('regional')}
                    className={`btn-navegacion ${viewType === 'regional' ? 'active' : ''}`}
                >
                    Resultados Regionales
                </button>

                {/* 🔑 CAMBIO 2: Nuevos Botones de Acción (Carga y Limpieza) */}
                <button 
                    onClick={handleCargarDataset}
                    className="btn-navegacion btn-carga-data"
                >
                    Cargar Dataset
                </button>
                <button 
                    onClick={handleLimpiarDataset}
                    className="btn-navegacion btn-limpiar-data"
                >
                    Limpiar Dataset
                </button>
            </div>
            {/* ------------------------------------------- */}

            <h2 className="titulo-seccion">Resultados {tituloDashboard}</h2>
            <p className="total-votos">TOTAL DE VOTOS REGISTRADOS: 
                <span className="count-value">{totalVotos.toLocaleString()}</span>
            </p>
            
            <div className="resultados-listado">
                {resultados.map((opcion, index) => {
                    const barWidth = opcion.porcentaje > 0 && opcion.porcentaje < 1 && opcion.votos > 0 ? 1 : opcion.porcentaje.toFixed(2);
                    // Determinar el título y el logo a usar
                    const displayTitle = opcion.isSpecial ? opcion.nombre : `${opcion.nombre} (${opcion.id})`;
                    const displayCandidate = opcion.isSpecial ? opcion.descripcion : `Candidato: ${opcion.candidato}`;
                    const displayLogo = opcion.isSpecial ? (
                        <span className="logo-admin-especial" style={{fontSize: '30px'}}>{opcion.icon}</span>
                    ) : (
                        <img src={opcion.logoUrl} alt={`Logo de ${opcion.nombre}`} className="logo-admin-partido" />
                    );

                    return (
                        <div key={opcion.id} className={`resultado-item ${opcion.isSpecial ? 'item-especial' : ''}`}>
                            
                            {/* Información del Partido/Voto (Columna 1) */}
                            <div className="info-partido-container">
                                {displayLogo}
                                <div className="info-partido">
                                    <span className="posicion">{index + 1}.</span>
                                    <h3 style={{ color: opcion.color }}>{displayTitle}</h3>
                                    {/* El problema del espaciado puede estar aquí, pero lo corregimos en CSS */}
                                    <p className="candidato-admin">{displayCandidate}</p> 
                                </div>
                            </div>

                            {/* Conteo de Votos (Columna 2) */}
                            <div className="conteo-votos">
                                {/* El problema del espaciado puede estar aquí, pero lo corregimos en CSS */}
                                <span className="votos-count">{opcion.votos.toLocaleString()} Votos</span>
                                <span className="votos-porcentaje">{opcion.porcentaje.toFixed(2)}%</span>
                            </div>

                            {/* Barra de Progreso */}
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