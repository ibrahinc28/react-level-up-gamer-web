import React from 'react';

const CartRow = ({ item, removeItem, updateQuantity }) => {
    
    const itemSubtotal = item.price * item.quantity;
    
    const getQuantityButtonClass = (isDisabled) => 
        isDisabled ? 'btn-disabled' : 'btn-default';

    return (
        <div 
            key={item.id} 
            style={{
                padding: '20px', 
                marginBottom: '10px', 
                border: '2px solid #333',
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '1.1em'
            }}
        >
            <div style={{ flex: 1, fontWeight: 'bold', marginRight: '24px', fontSize: '1.2em' }}>
                {item.name}
            </div>
            
            <div style={{ marginRight: '24px', fontSize: '1em' }}>
                Precio: ${item.price.toLocaleString('es-CL')}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
                <button 
                    className={getQuantityButtonClass(item.quantity <= 1)}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{ padding: '8px 15px', fontSize: '1.1em' }}
                >
                    −
                </button>
                <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                    style={{ width: '60px', height: '40px', textAlign: 'center', margin: '0 8px', border: '1px solid #555', backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)', fontSize: '1.1em' }} 
                    min="1"
                />
                <button 
                    className="btn-default"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ padding: '8px 15px', fontSize: '1.1em' }}
                >
                    +
                </button>
            </div>
            
            <div style={{ fontWeight: 'bold', marginRight: '24px', fontSize: '1.3em' }}>
                ${itemSubtotal.toLocaleString('es-CL')}
            </div>

            <div>
                <button
                    style={{ color: 'var(--neon-primary)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '2em', padding: '0 10px' }} 
                    title="Eliminar producto"
                    onClick={() => removeItem(item.id)}
                >
                    X
                </button>
            </div>
        </div>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '2px solid var(--neon-primary)', paddingBottom: '12px', marginBottom: '12px', paddingLeft: '20px', paddingRight: '20px', fontSize: '1.3em' }}>
                    <div style={{ flex: 1 }}>Producto</div>
                    <div style={{ marginRight: '24px' }}>Precio</div>
                    <div style={{ marginRight: '24px' }}>Cantidad</div>
                    <div style={{ marginRight: '24px' }}>Subtotal</div>
                    <div>Eliminar</div>
                </div>

                {cartItems.map((item) => (
                    <CartRow 
                        key={item.id} 
                        item={item} 
                        removeItem={removeItem}
                        updateQuantity={updateQuantity}
                    />
                ))}
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

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '32px', lineHeight: '1.6' }}>
                    <div style={{ fontSize: '1.5em' }}>
                        <span>Subtotal:</span>
                        <span style={{ width: '150px', display: 'inline-block', textAlign: 'right', fontWeight: 'bold', marginLeft: '16px' }}>${subtotal.toLocaleString('es-CL')} CLP</span>
                    </div>

                    {cartIsEmpty ? (
                        <div style={{ fontSize: '1.5em', color: '#666' }}> 
                            <span>Envío:</span>
                            <span style={{ width: '150px', display: 'inline-block', textAlign: 'right', fontWeight: 'bold', marginLeft: '16px' }}>$0 CLP</span>
                        </div>
                    ) : (
                        <div style={{ fontSize: '1.5em' }}> 
                            <span>Envío:</span>
                            <span style={{ width: '150px', display: 'inline-block', textAlign: 'right', fontWeight: 'bold', marginLeft: '16px' }}>${costoEnvio.toLocaleString('es-CL')} CLP</span>
                        </div>
                    )}
                    
                    <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--neon-secondary)', margin: '16px 0' }}></div>
                    
                    <div style={{ fontSize: '2.5em', fontWeight: '900', color: 'var(--neon-primary)', textShadow: '0 0 5px rgba(0, 255, 196, 0.4)' }}>
                        <span>Total a Pagar:</span>
                        <span style={{ width: '150px', display: 'inline-block', textAlign: 'right', marginLeft: '16px' }}>${displayTotalPagar.toLocaleString('es-CL')} CLP</span>
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
                        href="#productos"
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