import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar'; 
import Home from './pages/Home';
import BlogPage from './pages/BlogPage'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    return (
        <Router>
            <MyNavbar />
            
            <main> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/productos" element={<h1>Página de Productos (Pendiente)</h1>} />
                    <Route path="/carrito" element={<h1>Página de Carrito (Pendiente)</h1>} />
                    <Route path="/login" element={<h1>Página de Login (Pendiente)</h1>} />
                </Routes>
            </main>
            
        </Router>
    );
}

export default App;