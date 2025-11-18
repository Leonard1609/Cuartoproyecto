// frontend/src/VoteContext.jsx

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

// --- Importación de Logos (Archivos Cargados) ---
// ** ASEGÚRATE de que estas rutas sean correctas **
import logoAccionPopular from './assets/R.jpeg';
import logoFuerzaPopular from './assets/FUERZA-POPULAR@300x-100.jpg';
import logoPeruLibre from './assets/peru-libre-logo-png_seeklogo-401995.png';
import logoAlianzaProgreso from './assets/peru-alianza-para-el-progreso.png';
import logoRenovacionPopular from './assets/renovacion-popular1611829094_.png';
import logoJuntosPeru from './assets/png-transparent-juntos-por-el-peru-hd-logo.png';
// ---------------------------------------------------

// --- 1. Datos de los partidos políticos (Presidencial) ---
export const PARTIDOS_PRESIDENCIALES = [
    { id: 'FP', nombre: 'Fuerza Popular', candidato: 'Keiko Fujimori', color: '#ff7f00', logoUrl: logoFuerzaPopular, isCandidate: true },
    { id: 'PL', nombre: 'Perú Libre', candidato: 'Vladimir Cerrón', color: '#dc3545', logoUrl: logoPeruLibre, isCandidate: true },
    { id: 'APP', nombre: 'Alianza para el Progreso', candidato: 'César Acuña', color: '#20c997', logoUrl: logoAlianzaProgreso, isCandidate: true },
    { id: 'AP', nombre: 'Acción Popular', candidato: 'Alfredo Barnechea', color: '#007bff', logoUrl: logoAccionPopular, isCandidate: true },
    { id: 'RP', nombre: 'Renovación Popular', candidato: 'Rafael López Aliaga', color: '#6f42c1', logoUrl: logoRenovacionPopular, isCandidate: true },
    { id: 'JP', nombre: 'Juntos por el Perú', candidato: 'Verónika Mendoza', color: '#fd7e14', logoUrl: logoJuntosPeru, isCandidate: true },
];

// --- 2. Datos Regionales (Simulación) ---
const PARTIDOS_REGIONALES = [
    // Simulación de 3 movimientos/partidos regionales
    { id: 'MR1', nombre: 'Movimiento Regional 1', candidato: 'Juana Pérez', color: '#a29bfe', logoUrl: logoAccionPopular, isCandidate: true },
    { id: 'MR2', nombre: 'Movimiento Regional 2', candidato: 'Carlos García', color: '#00b894', logoUrl: logoJuntosPeru, isCandidate: true },
    { id: 'MR3', nombre: 'Movimiento Regional 3', candidato: 'Ana Torres', color: '#e17055', logoUrl: logoRenovacionPopular, isCandidate: true },
];

// --- 3. Opciones Especiales (Nulo y Blanco) ---
const OPCIONES_ESPECIALES = [
    { id: 'BLANCO', nombre: 'Voto en Blanco', candidato: 'No aplica', descripcion: 'No seleccionas a ningún candidato para este cargo.', color: '#34495e', icon: '◻️', isSpecial: true },
    { id: 'NULO', nombre: 'Voto Nulo', candidato: 'No aplica', descripcion: 'Anula intencionalmente tu voto.', color: '#c0392b', icon: '❌', isSpecial: true }
];

// Combina todos los candidatos por tipo de elección
const DATOS_PRESIDENCIALES_COMPLETOS = [...PARTIDOS_PRESIDENCIALES, ...OPCIONES_ESPECIALES];
const DATOS_REGIONALES_COMPLETOS = [...PARTIDOS_REGIONALES, ...OPCIONES_ESPECIALES];

// Función para generar un estado inicial con votos aleatorios
const createInitialVotes = (data) => {
    return data.reduce((acc, item) => {
        // Inicializa con votos aleatorios solo si es candidato normal
        acc[item.id] = item.isCandidate ? Math.floor(Math.random() * 10) + 1 : 0; 
        return acc;
    }, {});
};

// Estructura de voto inicial que guarda ambos conteos
const INITIAL_VOTES_STRUCTURE = {
    presidencial: createInitialVotes(DATOS_PRESIDENCIALES_COMPLETOS),
    regional: createInitialVotes(DATOS_REGIONALES_COMPLETOS),
};

// --- Contexto ---
const VoteContext = createContext();

export const useVoteContext = () => {
    return useContext(VoteContext);
};

export const VoteProvider = ({ children }) => {
    // 1. Cargar del localStorage, si existe, o usar la estructura inicial
    const [votes, setVotes] = useState(() => {
        try {
            const localData = localStorage.getItem('votosSimulados');
            return localData ? JSON.parse(localData) : INITIAL_VOTES_STRUCTURE;
        } catch (error) {
            console.error("Error cargando votos de localStorage, usando estado inicial:", error);
            return INITIAL_VOTES_STRUCTURE;
        }
    });

    // Estado para saber qué tipo de elección se está mostrando en Votacion.jsx
    const [currentType, setCurrentType] = useState('presidencial'); 

    // 2. Persistencia: Guarda en localStorage cada vez que 'votes' cambia
    useEffect(() => {
        localStorage.setItem('votosSimulados', JSON.stringify(votes));
    }, [votes]);

    // Simula el registro de un voto para una ELECCIÓN específica (type)
    const addVote = (type, partyId) => {
        setVotes(prevVotes => ({
            ...prevVotes,
            // Actualizamos solo el sub-objeto (presidencial o regional)
            [type]: {
                ...prevVotes[type],
                [partyId]: prevVotes[type][partyId] + 1,
            },
        }));
        // Opcional: Puedes comentar o quitar el console.log en producción
        console.log(`[Contexto de Voto] Voto registrado para: ${partyId} en ${type}.`);
    };

    const changeVoteType = (type) => {
        setCurrentType(type);
    };

    // 3. Cálculo de Resultados (Memoizado para eficiencia)
    const getResults = useMemo(() => {
        const calculateResults = (type) => {
            const data = type === 'presidencial' ? DATOS_PRESIDENCIALES_COMPLETOS : DATOS_REGIONALES_COMPLETOS;
            const currentVotes = votes[type];
            
            // Suma total de votos de la elección
            const totalVotos = Object.values(currentVotes).reduce((sum, count) => sum + count, 0);

            const resultadosCombinados = data.map(item => {
                const votoCount = currentVotes[item.id] || 0;
                const porcentaje = totalVotos > 0 ? (votoCount / totalVotos) * 100 : 0;
                return {
                    ...item,
                    votos: votoCount,
                    porcentaje: porcentaje,
                };
            }).sort((a, b) => {
                // Lógica de ordenación: Candidatos por votos, luego Nulo/Blanco
                const isSpecialA = a.isSpecial ? 1 : 0;
                const isSpecialB = b.isSpecial ? 1 : 0;
                
                // Si ambos son especiales o ambos son candidatos, ordenar por votos (desc)
                if (isSpecialA === isSpecialB) {
                    return b.votos - a.votos;
                }
                // Si son diferentes, Nulos/Blancos van al final (1-0 = 1, 0-1 = -1)
                return isSpecialA - isSpecialB;
            });

            return {
                totalVotos,
                resultados: resultadosCombinados,
            };
        };
        
        // Retorna los resultados calculados para ambas elecciones
        return {
            presidencial: calculateResults('presidencial'),
            regional: calculateResults('regional'),
        };
    }, [votes]);

    const value = {
        getResults, // Contiene {presidencial: {...}, regional: {...}}
        addVote,
        PARTIDOS_PRESIDENCIALES, 
        PARTIDOS_REGIONALES,     
        OPCIONES_ESPECIALES,     
        currentType,             
        changeVoteType,          
    };

    return <VoteContext.Provider value={value}>{children}</VoteContext.Provider>;
};