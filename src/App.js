import React from 'react';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import ContactoPage from './pages/ContactoPage'; 
import './App.css';

function App() {
    return (
        <div className="App">
            <MyNavbar />
            <main>
                <ContactoPage />
            </main>
            <Footer />
        </div>
    );
}

export default App;