import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productos } from './ProductosData';
import { Link } from 'react-router-dom';


function Productos({ addItemToCart }) {

return (
        <div>
        <h1>Productos</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {productos.map(producto => (
            <Card key={producto.codigo} style={{ width: '18rem', margin: '10px' }}>
                <Link to={`/productos/${producto.codigo}`}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ height: '150px', width: '100%', objectFit: 'contain' }} />
                </Link>
                <Card.Body>
                <Card.Title style={{ color: '#000', opacity: 1 }}>{producto.nombre}</Card.Title>
                {/*<Card.Text style={{ color: '#000', opacity: 1 }}>{producto.descripcion}</Card.Text>*/}
                <Card.Text style={{ color: '#000', opacity: 1 }}><strong>Precio: ${producto.precio.toLocaleString('es-CL')} CLP</strong></Card.Text>
                <Button variant="primary"
                onClick={() => addItemToCart(producto)}
                >
                    Agregar al carrito
                </Button>
                </Card.Body>
            </Card>
            ))}
        </div>
        </div>
    );
}


export default Productos;
