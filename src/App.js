import React, { useState, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import CarritoPage from './pages/CarritoPage'; 
import MyNavbar from './components/MyNavbar'; 
import './App.css'; 

const COSTO_ENVIO_CLP = 5000;

export default function App() {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('shoppingCart');
            return storedCart ? JSON.parse(storedCart) : []; 
        } catch (error) {
            console.error("Error al cargar el carrito de localStorage:", error);
            return [];
        }
    }); 
    
    const [purchaseMessage, setPurchaseMessage] = useState(null);

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const { 
        calculatedSubtotal, 
        calculatedCostoEnvio, 
        calculatedTotalPagar, 
        calculatedTotalItems 
    } = useMemo(() => {
        const calculatedSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const calculatedCostoEnvio = cartItems.length > 0 ? COSTO_ENVIO_CLP : 0;
        const calculatedTotalPagar = calculatedSubtotal + calculatedCostoEnvio;
        const calculatedTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

        return { 
            calculatedSubtotal, 
            calculatedCostoEnvio, 
            calculatedTotalPagar, 
            calculatedTotalItems 
        };
    }, [cartItems]);

    const vaciarCarrito = () => {
        setCartItems([]);
        setPurchaseMessage("🗑️ Carrito vaciado correctamente.");
        setTimeout(() => setPurchaseMessage(null), 2000);
    };

    const finalizarCompra = () => {
        if (cartItems.length === 0) return;
        setPurchaseMessage("✅ ¡Compra simulada! Carrito limpiado.");
        
        setTimeout(() => {
            setPurchaseMessage(null);
            setCartItems([]); 
        }, 3000);
    };

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        newQuantity = Math.max(0, parseInt(newQuantity) || 0);

        if (newQuantity === 0) {
            removeItem(itemId);
            return;
        }
        setCartItems(
            cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0)
        );
    };

    return (
        <Container fluid className="min-h-screen bg-gray-100 font-sans p-0">
            <MyNavbar cartItemCount={calculatedTotalItems} />

            <main className="pt-10 pb-20">
                <Container>
                    <CarritoPage 
                        cartItems={cartItems}
                        subtotal={calculatedSubtotal}
                        costoEnvio={calculatedCostoEnvio}
                        totalPagar={calculatedTotalPagar}
                        finalizarCompra={finalizarCompra}
                        vaciarCarrito={vaciarCarrito}
                        removeItem={removeItem}
                        updateQuantity={updateQuantity}
                        purchaseMessage={purchaseMessage}
                    />
                </Container>
            </main>
        </Container>
    );
}