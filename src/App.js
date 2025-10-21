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
import { productos } from './components/ProductosData';



const getCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('shoppingCart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

function App() {


  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productos) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.codigo === productos.codigo);
      if (itemExists) {
        return prevItems.map(item =>
          item.codigo === productos.codigo ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...productos, quantity: 1 }];
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
          <Route path="/carrito" element={<CarritoPage cartItems={cartItems} setCartItems={setCartItems} />} />
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



