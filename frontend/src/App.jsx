// frontend/src/App.jsx
// Este componente actúa como el gestor de sesión y enrutamiento principal.

import React, { useState } from 'react';
import Votacion from './Votacion';           // Componente para Votantes (Usuario Normal)
import AdminDashboard from './AdminDashboard'; // Componente para Administradores
import RegistroVotante from './RegistroVotante'; // Componente para la pantalla inicial
import './App.css'; 

// --- 1. Componente de Login de Administrador (Separado y simple) ---
const AdminLogin = ({ onLogin }) => {
  // Aquí usamos 'usuario' y 'password' para una autenticación simple
  const [usuario, setUsuario] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // SIMULACIÓN DE AUTENTICACIÓN ADMIN: (El backend de Java haría esta validación)
    if (usuario === 'admin' && password === 'secreto') { 
      // Si las credenciales son válidas, llama a la función de login con el rol 'admin'
      onLogin('admin');
    } else {
      setError('Credenciales de administrador inválidas.');
    }
  };

  return (
    <div className="contenedor-login admin-login">
      <h2>Acceso Exclusivo de Administrador</h2>
      <form onSubmit={manejarSubmit}>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuario / ID de Admin" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña de Admin" required />
        {error && <p className="mensaje-error">{error}</p>}
        <button type="submit" className="btn-admin-login">INGRESAR AL PANEL</button>
        <p className="volver-registro"><a href="/">Volver a Registro de Votantes</a></p>
      </form>
    </div>
  );
};


// --- 2. Componente Principal (App) ---
function App() {
  // Estado de la sesión del usuario: { dni: '...', rol: 'user' | 'admin' | null }
  const [usuario, setUsuario] = useState(null); 
  
  // Función central para establecer la sesión
  const manejarLogin = (dni, rol) => {
    // En un entorno empresarial, esta función guardaría el Token JWT
    setUsuario({ dni: dni, rol: rol, token: 'token-simulado-123' });
  };
  
  const manejarLogout = () => {
    // Cierra la sesión y limpia el token
    setUsuario(null);
  };
  
  // Detecta el acceso Admin oculto (URL: /?admin=login)
  const isUrlAdmin = window.location.search.includes('?admin=login');

  const renderContenido = () => {
    if (!usuario) {
      // Si no hay sesión, verifica si se usa la URL secreta
      if (isUrlAdmin) {
        // Muestra el Login de Administrador
        return <AdminLogin onLogin={(rol) => manejarLogin('AdminID', rol)} />;
      }
      
      // Por defecto, muestra la pantalla de REGISTRO de Votantes
      return <RegistroVotante onRegistroExitoso={manejarLogin} />;
    } 
    
    // Si hay sesión, dirige según el rol
    switch (usuario.rol) {
      case 'admin':
        return <AdminDashboard />; 
      case 'user':
        return <Votacion />; 
      default:
        // Manejo de error si el rol no es reconocido
        return <div>Error de Rol. Por favor, cierre sesión.</div>;
    }
  };

  return (
    <>
      <header className="header-app">
        <h1>Sistema de Votación ONPE </h1>
        {usuario && (
          <button onClick={manejarLogout} className="btn-logout">
            Cerrar Sesión ({usuario.rol})
          </button>
        )}
      </header>
      <div className="contenido-principal">
        {renderContenido()}
      </div>
      
      {/* Enlace OCULTO para el Administrador (solo visible si no hay sesión y no estamos en la página de Admin) */}
      {!usuario && !isUrlAdmin && (
          <p className="admin-link-oculto">
            ¿Admin? <a href="/?admin=login">Ingresar aquí</a>
          </p>
      )}
    </>
  );
}

export default App;