// frontend/src/VoteContext.jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

// --- Importación de Logos (Archivos Cargados) ---
import logoAccionPopular from './assets/R.jpeg';
import logoFuerzaPopular from './assets/FUERZA-POPULAR@300x-100.jpg';
import logoPeruLibre from './assets/peru-libre-logo-png_seeklogo-401995.png';
import logoAlianzaProgreso from './assets/peru-alianza-para-el-progreso.png';
import logoRenovacionPopular from './assets/renovacion-popular1611829094_.png';
import logoJuntosPeru from './assets/png-transparent-juntos-por-el-peru-hd-logo.png';
// ---------------------------------------------------


// Datos de los partidos políticos (nuestra "configuración" de base de datos)
export const PARTIDOS_SIMULADOS = [
    { id: 'FP', nombre: 'Fuerza Popular', candidato: 'Keiko Fujimori', color: '#ff7f00', logoUrl: logoFuerzaPopular },
    { id: 'PL', nombre: 'Perú Libre', candidato: 'Vladimir Cerrón', color: '#dc3545', logoUrl: logoPeruLibre },
    { id: 'APP', nombre: 'Alianza para el Progreso', candidato: 'César Acuña', color: '#20c997', logoUrl: logoAlianzaProgreso },
    { id: 'AP', nombre: 'Acción Popular', candidato: 'Alfredo Barnechea', color: '#007bff', logoUrl: logoAccionPopular },
    { id: 'RP', nombre: 'Renovación Popular', candidato: 'Rafael López Aliaga', color: '#6f42c1', logoUrl: logoRenovacionPopular },
    { id: 'JP', nombre: 'Juntos por el Perú', candidato: 'Verónika Mendoza', color: '#fd7e14', logoUrl: logoJuntosPeru },
];

// Inicializa el estado de votos con valores de prueba
const INITIAL_VOTES = PARTIDOS_SIMULADOS.reduce((acc, partido) => {
    acc[partido.id] = Math.floor(Math.random() * 10) + 1; 
    return acc;
}, {});

const VoteContext = createContext();

export const useVoteContext = () => {
    return useContext(VoteContext);
};

export const VoteProvider = ({ children }) => {
    const [votes, setVotes] = useState(INITIAL_VOTES);

    // Simula el registro de un voto
    const addVote = (partyId) => {
        setVotes(prevVotes => ({
            ...prevVotes,
            [partyId]: prevVotes[partyId] + 1,
        }));
        console.log(`[Contexto de Voto] Voto registrado para: ${partyId}.`);
    };

    // Calcula los resultados para el dashboard (se actualiza automáticamente)
    const getResults = useMemo(() => {
        const totalVotos = Object.values(votes).reduce((sum, count) => sum + count, 0);
        
        const resultadosCombinados = PARTIDOS_SIMULADOS.map(partido => {
            const votoCount = votes[partido.id] || 0;
            const porcentaje = totalVotos > 0 ? (votoCount / totalVotos) * 100 : 0;
            return {
                ...partido,
                votos: votoCount,
                porcentaje: porcentaje,
            };
        }).sort((a, b) => b.votos - a.votos); // Ordena por más votos

        return {
            totalVotos,
            resultados: resultadosCombinados,
        };
    }, [votes]);

    const value = {
        getResults,
        addVote,
        PARTIDOS_SIMULADOS,
    };

    return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
};