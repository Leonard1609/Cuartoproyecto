import React, { useState } from 'react';
import { useVoteContext } from './VoteContext';

const Votacion = () => {
    const { 
        PARTIDOS_PRESIDENCIALES, 
        PARTIDOS_REGIONALES, 
        OPCIONES_ESPECIALES, 
        addVote, 
        currentType, 
        changeVoteType 
    } = useVoteContext();
    
    const [haVotado, setHaVotado] = useState(false);
    const [votoSeleccionadoId, setVotoSeleccionadoId] = useState(null);
    const [votoSeleccionadoType, setVotoSeleccionadoType] = useState(null);

    // Selecciona los datos según el tipo de elección actual
    const candidatosActuales = currentType === 'presidencial' ? PARTIDOS_PRESIDENCIALES : PARTIDOS_REGIONALES;
    const tituloEleccion = currentType === 'presidencial' ? 'Presidencial (2026)' : 'Regional (2026)';
    
    const manejarVoto = (idOpcion) => {
        if (haVotado) return;

        addVote(currentType, idOpcion); 

        setVotoSeleccionadoId(idOpcion);
        setVotoSeleccionadoType(currentType);
        setHaVotado(true);
    };

    const getBotonTexto = (idOpcion) => {
        if (!haVotado) {
            return 'VOTAR';
        }
        return votoSeleccionadoId === idOpcion && votoSeleccionadoType === currentType ? '¡VOTO GUARDADO!' : 'Voto Emitido';
    };

    return (
        <div className="contenedor-votacion">
            {/* 💡 Nuevo: Selector de Elección */}
            <div className="selector-eleccion">
                <button 
                    onClick={() => { changeVoteType('presidencial'); setHaVotado(false); setVotoSeleccionadoId(null); }}
                    className={currentType === 'presidencial' ? 'active' : ''}
                >
                    Presidencial
                </button>
                <button 
                    onClick={() => { changeVoteType('regional'); setHaVotado(false); setVotoSeleccionadoId(null); }}
                    className={currentType === 'regional' ? 'active' : ''}
                >
                    Regional
                </button>
            </div>
            {/* ------------------------------- */}

            {/* APLICACIÓN DE LA CLASE CSS: Añadir className="cedula-titulo" aquí */}
            <h1 className="cedula-titulo">🗳️ Cédula de Votación {tituloEleccion}</h1> 
            
            {haVotado && votoSeleccionadoType === currentType && (
                    <div className="mensaje-confirmacion">
                        ¡Voto registrado! Su selección (**{votoSeleccionadoId}**) ha sido enviada para la elección {currentType.toUpperCase()}.
                    </div>
            )}

            <div className="lista-opciones">
                {candidatosActuales.map(opcion => (
                    <div key={opcion.id} className="tarjeta-opcion">
                        <img src={opcion.logoUrl} alt={`Logo de ${opcion.nombre}`} className="logo-partido" />
                        
                        {/* Aquí mantienes tu estilo inline para el color del nombre del partido, lo cual está bien */}
                        <h2 style={{ color: opcion.color }}>{opcion.nombre} ({opcion.id})</h2> 
                        <p>Candidato: **{opcion.candidato}**</p>

                        <button 
                            onClick={() => manejarVoto(opcion.id)} 
                            disabled={haVotado}
                            className={haVotado ? 'btn-votado' : 'btn-votar'}
                        >
                            {getBotonTexto(opcion.id)}
                        </button>
                    </div>
                ))}

                {OPCIONES_ESPECIALES.map(opcion => (
                    <div key={opcion.id} className="tarjeta-opcion tarjeta-adicional">
                        <span className="logo-especial" style={{fontSize: '50px'}}>{opcion.icon}</span>
                        
                        {/* Aquí mantienes tu estilo inline para el color del nombre de la opción especial */}
                        <h2 style={{ color: opcion.color }}>{opcion.nombre}</h2> 
                        <p>{opcion.descripcion}</p>

                        <button 
                            onClick={() => manejarVoto(opcion.id)} 
                            disabled={haVotado}
                            className={haVotado ? 'btn-votado' : 'btn-votar-especial'}
                        >
                            {getBotonTexto(opcion.id)}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Votacion;