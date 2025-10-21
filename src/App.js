import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Productos from './components/Productos';
import DetalleProducto from './components/DetalleProductos';
import Categorias from './components/Categorias';
import CarritoPage from './pages/CarritoPage';
import BlogPage from './pages/BlogPage';
import AdminPage from './pages/AdminPage';
import Contacto from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';


function App() {


  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };


  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#FFFFFF' }}>
        <MyNavbar />
        <Categorias />
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          
          
          {/* Rutas */}
          <Route path="/productos" element={<Productos addItemToCart={addItemToCart}/>} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<CarritoPage cartItems={cartItems}/>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path='/user' element={<UserPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/adminmode' element={<AdminPage />}/>

          
          {}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;



