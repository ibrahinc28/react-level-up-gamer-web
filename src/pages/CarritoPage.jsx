import React, { useState, useEffect } from 'react';
import Carrito from '../components/carrito'; 

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

const CarritoPage = () => {

    const [cartItems, setCartItems] = useState(getCartFromLocalStorage());
    const [purchaseMessage, setPurchaseMessage] = useState('');

    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        setPurchaseMessage(`❌ Producto eliminado correctamente.`);
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;

        const newCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: quantity } : item
        );
        setCartItems(newCart);
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

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const costoEnvio = subtotal > 100000 ? 0 : 5000; 
    const totalPagar = subtotal + costoEnvio;

    return (
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
    );
};

export default CarritoPage;
