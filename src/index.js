import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos base de la plantilla (no es App.css)
import App from './App'; // Importamos el componente principal App

// Importamos el CSS de Bootstrap que es necesario para React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 

// Este código monta el componente App en el elemento <div id="root">
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);