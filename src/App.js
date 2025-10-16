import React from 'react';
import MyNavbar from './components/MyNavbar';
import ContactoPage from './pages/ContactoPage'; 

import './App.css';

function App() {
    return (
        <div className="App">
            <MyNavbar />
            <main>
                <ContactoPage />
            </main>
            
        </div>
    );
}

export default App;