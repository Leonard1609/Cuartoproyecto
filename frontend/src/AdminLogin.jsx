// frontend/src/AdminLogin.jsx
import React, { useState } from 'react';
import onpeLogo from './assets/onpe-logo.jpg'; // Asegúrate que la ruta sea correcta
import escudoPeru from './assets/Escudo_nacional_del_Perú.svg'; // Asegúrate que esta ruta sea correcta

const AdminLogin = ({ onLogin }) => {
  const [usuario, setUsuario] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Credenciales de Administrador: Usuario: admin, Contraseña: secreto
    if (usuario === 'admin' && password === 'secreto') { 
      onLogin('admin');
    } else {
      setError('Credenciales de administrador inválidas.');
    }
  };

  return (
    <div className="contenedor-login admin-login">
      <img src={onpeLogo} alt="Logo ONPE" className="logo-onpe" />
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

export default AdminLogin;