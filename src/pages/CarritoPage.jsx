import React, { useState, useEffect } from 'react';
import Carrito from '../components/carrito';
import axios from 'axios';

// Función para obtener el carrito del almacenamiento local
const getCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem('shoppingCart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        console.error("Error al cargar el carrito:", e);
        return [];
    }
};

// Función para guardar el carrito en el almacenamiento local
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
        // Sincroniza el estado del carrito con el almacenamiento local cada vez que cambia
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        setPurchaseMessage('❌ Producto eliminado correctamente.');
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
        setPurchaseMessage('✅ ¡El carrito ha sido vaciado completamente!');
    };

    const finalizarCompra = async () => {
        try {
            // CORRECCIÓN CLAVE 1: Protección contra precios faltantes (usa 0 si el precio es undefined)
            const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
            const costoEnvio = subtotal > 100000 ? 0 : 5000;
            const totalPagar = subtotal + costoEnvio;

            const carritoParaEnviar = {
                itemsJson: JSON.stringify(cartItems),
                subtotal,
                costoEnvio,
                totalPagar
            };

            await axios.post('http://localhost:8080/api/carrito', carritoParaEnviar);

            setCartItems([]);
            setPurchaseMessage('✅ ¡Gracias por tu compra! Tu pedido ha sido procesado.');
        } catch (error) {
            console.error('Error al enviar el carrito al backend:', error);
            setPurchaseMessage('❌ Hubo un error al procesar la compra.');
        }
    };

    // CORRECCIÓN CLAVE 2: Protección contra precios faltantes para la vista
    const subtotal = cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);
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