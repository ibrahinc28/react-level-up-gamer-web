<<<<<<< HEAD
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
=======
<<<<<<< HEAD
=======
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProductos';
import Categorias from './components/Categorias';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#FFFFFF' }}>
        <MyNavbar />
        <Categorias />
        <Routes>
          {/* Ruta principal llama al componente Home que debe incluir Banner y Categorías */}
          <Route path="/" element={<Home />} />
          
          
          {/* Ruta productos */}
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path='/user' element={<UserPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/adminmode' element={<AdminPage />}/>

          
          {/* Si quieres una ruta alias para home, usa redirección o elimina si no es necesaria */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


>>>>>>> origin/dev
>>>>>>> origin/dev
