// frontend/src/RegistroVotante.jsx

import React, { useState } from 'react';
import onpeLogo from './assets/onpe-logo.jpg'; 
import './index.css'

const RegistroVotante = ({ onRegistroExitoso }) => {
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

    // SIMULACIÓN DE LLAMADA POST AL BACKEND DE JAVA
    console.log('Datos de registro enviados para autenticación:', datos);
    setMensaje('Datos validados. Accediendo a la cédula de votación...');
    
    setTimeout(() => {
        onRegistroExitoso(datos.dni, 'user');
    }, 1500);
  };
  
  return (
    <div className="contenedor-registro votante-registro-borde"> 
      <img src={onpeLogo} alt="Logo ONPE" className="logo-onpe" />
      <h2>Registro Único de Votante</h2>
      <p className="instruccion-login">
        Ingrese sus datos personales para validar su identidad y acceder a la votación electrónica.
      </p>

      <form onSubmit={manejarSubmit} className="formulario-registro">
        <input name="dni" type="number" value={datos.dni} onChange={manejarCambio} placeholder="Número de DNI (8 dígitos)" required maxLength="8" />
        
        <div className="grupo-nombres">
            <input name="apellidoPaterno" type="text" value={datos.apellidoPaterno} onChange={manejarCambio} placeholder="Apellido Paterno" required />
            <input name="apellidoMaterno" type="text" value={datos.apellidoMaterno} onChange={manejarCambio} placeholder="Apellido Materno" required />
            <input name="nombres" type="text" value={datos.nombres} onChange={manejarCambio} placeholder="Nombres" required />
        </div>
        
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