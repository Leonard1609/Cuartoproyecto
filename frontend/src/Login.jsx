// frontend/src/Login.jsx - Login principal para votantes, con acceso Admin "oculto"

import React, { useState } from 'react';
import onpeLogo from './assets/onpe-logo.png'; // Importa el logo de ONPE

const Login = ({ onLogin }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    // *** LÓGICA DE AUTENTICACIÓN SIMULADA (APUNTANDO AL BACKEND JAVA) ***
    // En un sistema real, aquí se haría un POST a tu API de Java.
    // El backend validaría DNI, password, y devolvería el rol y un token.

    if (dni.length !== 8) {
        setError('El DNI debe tener 8 dígitos.');
        return;
    }
    
    // Simulación de roles basados en DNI y password para el frontend:
    if (dni === '12345678' && password === 'admin') {
      onLogin('admin'); // DNI de ejemplo para Administrador
    } else if (dni === '87654321' && password === 'votar') {
      onLogin('user');  // DNI de ejemplo para Votante
    } else {
      setError('Credenciales inválidas. Por favor, verifique su DNI y Contraseña.');
    }
  };

  return (
    <div className="contenedor-login">
      <img src={onpeLogo} alt="Logo ONPE" className="logo-onpe" />
      <h2>Ingreso al Sistema Electoral</h2>
      <p className="instruccion-login">
        Por favor, ingrese sus datos de identificación para acceder a la cédula de votación.
      </p>

      <form onSubmit={manejarSubmit}>
        <div className="grupo-input">
          <label htmlFor="dni">Número de DNI:</label>
          <input
            id="dni"
            type="number" 
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            placeholder="Ingrese 8 dígitos de su DNI"
            maxLength="8"
          />
        </div>
        <div className="grupo-input">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingrese su contraseña"
          />
        </div>
        
        {error && <p className="mensaje-error">{error}</p>}
        
        <button type="submit" className="btn-login">Acceder y Votar</button>
      </form>
    </div>
  );
};

export default Login;