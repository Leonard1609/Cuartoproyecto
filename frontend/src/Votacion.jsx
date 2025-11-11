// frontend/src/Votacion.jsx 

import React, { useState } from 'react';
import { useVoteContext } from './VoteContext';

const Votacion = () => {
    const { PARTIDOS_SIMULADOS, addVote } = useVoteContext();
    const [haVotado, setHaVotado] = useState(false);
    const [votoSeleccionadoId, setVotoSeleccionadoId] = useState(null);
    
    const manejarVoto = (idOpcion) => {
        if (haVotado) return;

        // 1. Llama a la función del contexto para actualizar el conteo global.
        addVote(idOpcion); 

        // 2. Bloquea al usuario localmente.
        setVotoSeleccionadoId(idOpcion);
        setHaVotado(true);
    };

    return (
        <div className="contenedor-votacion">
            <h1>🗳️ Cédula de Votación Presidencial (2026)</h1>
            
            {haVotado && (
                <div className="mensaje-confirmacion">
                    ¡Voto registrado! Su selección (**{votoSeleccionadoId}**) ha sido enviada al sistema electoral.
                </div>
            )}

            <div className="lista-opciones">
                {PARTIDOS_SIMULADOS.map(opcion => (
                    <div key={opcion.id} className="tarjeta-opcion">
                        <img src={opcion.logoUrl} alt={`Logo de ${opcion.nombre}`} className="logo-partido" />
                        
                        <h2 style={{ color: opcion.color }}>{opcion.nombre} ({opcion.id})</h2>
                        <p>Candidato: **{opcion.candidato}**</p>

                        <button 
                            onClick={() => manejarVoto(opcion.id)} 
                            disabled={haVotado}
                            className={haVotado ? 'btn-votado' : 'btn-votar'}
                        >
                            {haVotado ? (votoSeleccionadoId === opcion.id ? '¡VOTO GUARDADO!' : 'Voto Emitido') : 'VOTAR'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Votacion;