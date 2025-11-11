// frontend/src/App.jsx
import React, { useState } from 'react';
import { VoteProvider } from './VoteContext';
import Votacion from './Votacion';
import AdminDashboard from './AdminDashboard';
import RegistroVotante from './RegistroVotante';
import AdminLogin from './AdminLogin';
import './App.css'; 
// import { Flag } from 'lucide-react'; // Ya no se necesita el ícono genérico

// URLs de los activos
const FLAG_URL = "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg";
// Escudo Nacional para usar como fondo
export const ESCUDO_NACIONAL_URL = "https://upload.wikimedia.org/wikipedia/commons/d/da/Escudo_Nacional_del_Per%C3%BA.svg";


// --- Componente Principal (App) ---
function App() {
  // Estado de la sesión del usuario: { dni: '...', rol: 'user' | 'admin' | null }
  const [usuario, setUsuario] = useState(null); 
  
  // Función central para establecer la sesión
  const manejarLogin = (dni, rol) => {
    setUsuario({ dni: dni, rol: rol, token: 'token-simulado-123' });
  };
  
  const manejarLogout = () => {
    setUsuario(null);
    // Redirige a la página principal tras cerrar sesión
    window.history.pushState({}, '', '/');
  };
  
  // Detecta el acceso Admin oculto (URL: /?admin=login)
  const isUrlAdmin = window.location.search.includes('?admin=login');

  const renderContenido = () => {
    if (!usuario) {
      if (isUrlAdmin) {
        return <AdminLogin onLogin={(rol) => manejarLogin('AdminID', rol)} />;
      }
      return <RegistroVotante onRegistroExitoso={manejarLogin} />;
    } 
    
    switch (usuario.rol) {
      case 'admin':
        return <AdminDashboard />; 
      case 'user':
        return <Votacion />; 
      default:
        return <div>Error de Rol. Por favor, cierre sesión.</div>;
    }
  };

  return (
    <VoteProvider>
      <header className="header-app">
        <div className="header-left">
          {/* Implementación de la imagen de la bandera */}
          <img src={FLAG_URL} alt="Bandera de Perú" className="icon-peru flag-image" />
          <h1>Sistema de Votación Nacional Del Peru</h1>
        </div>
        
        {usuario && (
          <button onClick={manejarLogout} className="btn-logout">
            Cerrar Sesión ({usuario.rol === 'admin' ? 'ADMIN' : 'VOTANTE'})
          </button>
        )}
      </header>
      
      {/* Nuevo wrapper para el fondo del Escudo Nacional */}
      <div className="main-background-wrapper">
        <div className="contenido-principal">
          {renderContenido()}
        </div>
      </div>
      
      {/* Enlace OCULTO para el Administrador */}
      {!usuario && !isUrlAdmin && (
          <p className="admin-link-oculto">
            ¿Admin? <a href="/?admin=login">Ingresar aquí</a>
          </p>
      )}
    </VoteProvider>
  );
}

export default App;