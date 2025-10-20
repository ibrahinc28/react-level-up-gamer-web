import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import BlogPage from './pages/BlogPage'; 

function App() {
    return (
        <Router>
            <MyNavbar />
            
            <main> 
                <Routes>
                    <Route path="/" element={<BlogPage />} />
                    <Route path="/home" element={<BlogPage />} /> 
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/productos" element={<BlogPage />} />
                    <Route path="/carrito" element={<BlogPage />} />
                    <Route path="/contacto" element={<BlogPage />} />
                    <Route path="/iniciarsesion" element={<BlogPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;