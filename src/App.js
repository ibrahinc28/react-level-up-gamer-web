import React from 'react';
import MyNavbar from './components/MyNavbar';
import ContactoPage from './pages/ContactoPage'; 

import './App.css'; 

function App() {
    return (
        <div className="App">
            
            {/* 1. La barra de navegación debe ir en la parte superior */}
            <MyNavbar />
            
            {/* 2. El contenido principal de la página */}
            <main>
                {/* Actualmente solo muestra la página de Contacto */}
                <ContactoPage />
            </main>
            
        </div>
    );
}

export default App;