import React, { useState, useEffect } from 'react';  
import Carrito from '../components/carrito';
import Productos from '../components/Productos';

const getCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem('shoppingCart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error("Error al cargar el carrito:", e);
        return [];
    }
};

const saveCartToLocalStorage = (cart) => {
    try {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (e) {
        console.error("Error al guardar el carrito:", e);
    }
};

const CarritoPage = ({ cartItems, setCartItems }) => {

    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    useEffect(() => {
        fetch('http://44.223.134.187:8080/api/productos')
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error("Error al cargar productos:", error));
    }, []);

    const addItemToCart = (product) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.codigo === product.codigo);
            if (itemExists) {
                return prevItems.map(item =>
                    item.codigo === product.codigo ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setPurchaseMessage('');
    };

    const removeItem = (codigo) => {
        setCartItems(prevItems => prevItems.filter(item => item.codigo !== codigo));
        setPurchaseMessage(`❌ Producto eliminado correctamente.`);
    };

    const updateQuantity = (codigo, quantity) => {
        if (quantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.codigo === codigo ? { ...item, quantity: quantity } : item
            )
        );
        setPurchaseMessage('');
    };

    const vaciarCarrito = () => {
        setCartItems([]);
        setPurchaseMessage("✅ ¡El carrito ha sido vaciado completamente!");
    };

    const finalizarCompra = () => {
        setCartItems([]);
        setPurchaseMessage("✅ ¡Gracias por tu compra! Tu pedido ha sido procesado.");
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const costoEnvio = subtotal > 100000 ? 0 : 5000; 
    const totalPagar = subtotal + costoEnvio;

    return (
        <>
            <Productos productos={productos} addItemToCart={addItemToCart} />

            <Carrito 
                cartItems={cartItems}
                subtotal={subtotal}
                costoEnvio={costoEnvio}
                totalPagar={totalPagar}
                finalizarCompra={finalizarCompra}
                vaciarCarrito={vaciarCarrito}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                purchaseMessage={purchaseMessage}
            />
        </>
    );
};

export default CarritoPage;