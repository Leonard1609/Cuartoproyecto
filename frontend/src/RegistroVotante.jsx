// frontend/src/RegistroVotante.jsx

import React, { useState } from 'react';
import onpeLogo from './assets/onpe-logo.jpg'; 
// Importaremos el logo de ONPE. Asegúrate de que la ruta sea correcta.

const RegistroVotante = ({ onRegistroExitoso }) => {
  // Estado para capturar los datos requeridos (similares al DNI)
  const [datos, setDatos] = useState({
    dni: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setError('');
    setMensaje('');
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    if (datos.dni.length !== 8) {
      setError('El DNI debe tener 8 dígitos.');
      return;
    }

    // *** SIMULACIÓN DE LLAMADA POST AL BACKEND DE JAVA ***
    // 1. El backend (Java) debe recibir estos datos.
    // 2. El backend validará que el DNI no haya votado antes.
    // 3. Si es exitoso, el backend autentica al usuario y crea un token de sesión.
    
    console.log('Datos de registro enviados para autenticación:', datos);
    setMensaje('Datos validados. Accediendo a la cédula de votación...');
    
    // SIMULACIÓN PURA de éxito (pasando directamente al componente Votacion)
    setTimeout(() => {
        // En un proyecto real, se llamaría a la API de Java para obtener un token, 
        // y luego se llamaría a onRegistroExitoso(token, 'user');
        onRegistroExitoso(datos.dni, 'user');
    }, 1500);
  };
  
  return (
    <div className="contenedor-registro">
      <img src={onpeLogo} alt="Logo ONPE" className="logo-onpe" />
      <h2>Registro Único de Votante</h2>
      <p className="instruccion-login">
        Ingrese sus datos personales para validar su identidad y acceder a la votación electrónica.
      </p>

      <form onSubmit={manejarSubmit} className="formulario-registro">
        {/* FILA 1: DNI (Clave de Identificación) */}
        <input name="dni" type="number" value={datos.dni} onChange={manejarCambio} placeholder="Número de DNI (8 dígitos)" required maxLength="8" />
        
        {/* FILA 2: Apellidos y Nombres */}
        <div className="grupo-nombres">
            <input name="apellidoPaterno" type="text" value={datos.apellidoPaterno} onChange={manejarCambio} placeholder="Apellido Paterno" required />
            <input name="apellidoMaterno" type="text" value={datos.apellidoMaterno} onChange={manejarCambio} placeholder="Apellido Materno" required />
            <input name="nombres" type="text" value={datos.nombres} onChange={manejarCambio} placeholder="Nombres" required />
        </div>
        
        {/* FILA 3: Contacto (Opcional en la simulación) */}
        <input name="email" type="email" value={datos.email} onChange={manejarCambio} placeholder="Correo Electrónico" />
        <input name="phone" type="tel" value={datos.phone} onChange={manejarCambio} placeholder="Teléfono" />

        {error && <p className="mensaje-error">{error}</p>}
        {mensaje && <p className="mensaje-confirmacion">{mensaje}</p>}
        
        <button type="submit" className="btn-registro">VALIDAR DNI Y CONTINUAR</button>
      </form>
    </div>
  );
};

export default RegistroVotante;