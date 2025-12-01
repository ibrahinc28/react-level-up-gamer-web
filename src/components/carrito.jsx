import React from 'react';
import { Table } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';


const CartRow = ({ item, removeItem, updateQuantity }) => {
    
    const itemSubtotal = item.precio * item.quantity;

    const getQuantityButtonClass = (isDisabled) => 
        isDisabled ? 'btn-disabled' : 'btn-default';

    return (
        <tr key={item.codigo} style={{ fontSize: '1.1em' }}> 
            <td>
                <Link to={`/productos/${item.codigo}`}>
                <img 
                    src={item.imagen} 
                    alt={item.nombre} 
                    style={{ width: '82px', height: '82px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }} 
                />
                </Link>
            </td>
            <td style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                {item.nombre}
            </td>
            
            <td style={{ fontSize: '1em' }}>
                Precio:  ${item.precio ? item.precio.toLocaleString('es-CL') : '0'}
            </td>
            
            <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button 
                    className={getQuantityButtonClass(item.quantity <= 1)}
                    onClick={() => updateQuantity(item.codigo, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{ padding: '8px 15px', fontSize: '1.1em' }}
                >
                    −
                </button>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.codigo, parseInt(e.target.value) || 0)}
                    style={{ width: '60px', height: '40px', textAlign: 'center', margin: '0 8px', border: '1px solid #555', backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', fontSize: '1.1em' }} 
                    min="1"
                />
                <button 
                    className="btn-default"
                    onClick={() => updateQuantity(item.codigo, item.quantity + 1)}
                    style={{ padding: '8px 15px', fontSize: '1.1em' }}
                >
                    +
                </button>
            </td>
            
            <td style={{ fontWeight: 'bold', fontSize: '1.3em' }}>
                ${itemSubtotal.toLocaleString('es-CL')}
            </td>

            <td>
                <button
                    style={{ color: 'var(--neon-primary)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '2em', padding: '0 10px' }} 
                    title="Eliminar producto"
                    onClick={() => removeItem(item.codigo)}
                >
                    X
                </button>
            </td>
        </tr>
    );
};


const Carrito = ({
    cartItems,
    subtotal,
    costoEnvio,
    totalPagar,
    finalizarCompra,
    vaciarCarrito,
    removeItem,
    updateQuantity,
    purchaseMessage,
}) => {
    
    const formatPriceWithCurrency = (precio) => {
        return (
            <span style={{ whiteSpace: 'nowrap' }}>
                {precio.toLocaleString('es-CL')} CLP
            </span>
        );
    };

    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return (
                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '1.5em' }}>
                    <p>Tu carrito está vacío.</p>
                </div>
            );
        }

        return (
            <div style={{ marginTop: '24px' }}>
                <Table 
                    responsive 
                    style={{ 
                        borderCollapse: 'collapse', 
                        width: '100%', 
                        tableLayout: 'fixed' 
                    }}
                >
                    <thead>
                        <tr style={{ 
                            fontWeight: 'bold', 
                            borderBottom: '2px solid var(--neon-primary)', 
                            paddingBottom: '12px', 
                            fontSize: '1.3em' 
                        }}>
                            <th style={{ flex: 1, padding: '12px' }}>Producto</th>
                            <th style={{ padding: '12px' }}>Precio</th>
                            <th style={{ padding: '12px', textAlign: 'center' }}>Cantidad</th>
                            <th style={{ padding: '12px' }}>Subtotal</th>
                            <th style={{ padding: '12px' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <CartRow 
                                key={item.codigo} 
                                item={item} 
                                removeItem={removeItem}
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    const totalProducts = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartIsEmpty = totalProducts === 0;

    const displayTotalPagar = cartIsEmpty ? 0 : totalPagar;


    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px' }}>

            <h1 className="neon-glow-text-secondary" style={{ textAlign: 'center', fontSize: '3.5em', fontWeight: 'bold', marginBottom: '40px' }}>
                Carrito de Compras
            </h1>

            {purchaseMessage && (
                <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--neon-primary)', border: '2px solid var(--neon-primary)', padding: '12px', borderRadius: '6px', fontSize: '1.2em' }}>
                    {purchaseMessage}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333', paddingBottom: '12px', marginBottom: '24px', fontSize: '1.3em' }}>
                <p style={{ fontWeight: '600' }}>Total de productos: {totalProducts}</p>
                <p style={{ fontWeight: '600' }}>{cartIsEmpty ? 'Tu carrito está vacío.' : ''}</p>
            </div>

            {renderCartItems()}

            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #333' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '100%', maxWidth: '450px', marginBottom: '32px' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.5em', marginBottom: '10px' }}>
                            <span>Subtotal:</span>
                            <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>${formatPriceWithCurrency(subtotal)}</span>
                        </div>

                        {cartIsEmpty ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.5em', color: '#666', marginBottom: '10px' }}> 
                                <span>Envío:</span>
                                <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>$0 CLP</span>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.5em', marginBottom: '10px' }}> 
                                <span>Envío:</span>
                                <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>${formatPriceWithCurrency(costoEnvio)}</span>
                            </div>
                        )}
                        
                        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--neon-secondary)', margin: '16px 0' }}></div>
                        
                        <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                fontSize: '2em', 
                                fontWeight: '900', 
                                color: 'var(--neon-primary)', 
                                textShadow: '0 0 5px rgba(0, 255, 196, 0.4)',
                                whiteSpace: 'nowrap'
                            }}>
                            <span>Total a Pagar:</span>
                            <span style={{ 
                                marginLeft: '8px', 
                                textAlign: 'right', 
                                fontSize: '0.8em',
                                fontWeight: 'bold'
                            }}>${formatPriceWithCurrency(displayTotalPagar)}</span>
                        </div>

                    </div>
                </div>


                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '24px' }}> 

                        <button 
                            id="vaciar-carrito" 
                            className={cartIsEmpty ? 'btn-disabled' : 'btn-default'}
                            onClick={vaciarCarrito}
                            disabled={cartIsEmpty}
                            style={{ padding: '15px 30px', fontSize: '1.2em' }}
                        >
                            Vaciar Carrito
                        </button>

                        <button 
                            id="finalizar-compra" 
                            className={cartIsEmpty ? 'btn-disabled' : 'btn-neon-action'}
                            onClick={finalizarCompra}
                            disabled={cartIsEmpty}
                            style={{ padding: '15px 30px', fontSize: '1.2em' }}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                    <a 
                        href="/productos"
                        className="btn-default"
                        style={{ 
                            textDecoration: 'none', 
                            padding: '15px 30px',
                            fontSize: '1.2em'
                        }} 
                        title="Volver a la tienda"
                    >
                        Continuar Comprando
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Carrito;