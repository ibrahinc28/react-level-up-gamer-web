import React from 'react';

import ContactoPage from './pages/ContactoPage'; 
import './App.css'; 

function App() {
    return (
        <div className="App">
            {/* El Header y Footer se eliminaron del código */}
            
            <main>
                <ContactoPage />
            </main>
        </div>
    );
}

export default App;