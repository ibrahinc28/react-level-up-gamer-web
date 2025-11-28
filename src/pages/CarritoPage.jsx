import React, { useState, useEffect } from 'react';
import Carrito from '../components/Carrito'; 
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

const getAuthToken = () => {
    return localStorage.getItem('authToken'); 
};


const CarritoPage = ({ cartItems, setCartItems }) => {

    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        saveCartToLocalStorage(cartItems);
    }, [cartItems]);

    useEffect(() => {
        fetch('http://localhost:8080/api/productos')
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

    const finalizarCompra = async () => {
        if (cartItems.length === 0) {
            setPurchaseMessage("❌ El carrito está vacío. Añade productos para comprar.");
            return;
        }

        setIsLoading(true);
        const token = getAuthToken();
        
        const purchaseData = {
            itemsJson: JSON.stringify(cartItems.map(item => ({
                codigo: item.codigo,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.quantity
            }))),
            subtotal: subtotal,
            costoEnvio: costoEnvio,
            totalPagar: totalPagar,
        };

        try {
            const response = await fetch('http://localhost:8080/api/carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '', 
                },
                body: JSON.stringify(purchaseData),
            });

            if (response.ok) {
                setCartItems([]);
                setPurchaseMessage("✅ ¡Gracias por tu compra! Pedido registrado con éxito en el servidor.");
            } else if (response.status === 401) {
                setPurchaseMessage("❌ Error: No autorizado. Por favor, inicia sesión para completar tu compra.");
            } else {
                const errorText = await response.text();
                setPurchaseMessage(`❌ Error al procesar el pedido. Código: ${response.status}.`);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setPurchaseMessage("❌ Error de conexión: No se pudo contactar al servidor de Spring Boot.");
        } finally {
            setIsLoading(false);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const costoEnvio = subtotal > 100000 ? 0 : 5000; 
    const totalPagar = subtotal + costoEnvio;

    return (
        <div className="p-4 bg-white"> 
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
                isLoading={isLoading}
            />
        </div>
    );
};

export default CarritoPage;