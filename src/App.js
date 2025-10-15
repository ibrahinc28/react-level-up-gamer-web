import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './components/Home';
import MyNavbar from './components/MyNavbar'; 
import BlogPage from './pages/BlogPage'; 

function App() {
    return (
        <Router>
            <MyNavbar />
            
            <main> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/productos" element={<Home />} />
                    <Route path="/carrito" element={<Home />} />
                    <Route path="/contacto" element={<Home />} />
                    <Route path="/iniciarsesion" element={<Home />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;