import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productos } from './ProductosData';


function Productos() {

return (
        <div>
        <h1>Productos</h1>
        <div className="d-flex flex-wrap justify-content-around">
            {productos.map(producto => (
            <Card key={producto.codigo} style={{ width: '18rem', margin: '10px' }}>
                <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} style={{ height: '150px', width: '100%', objectFit: 'contain' }} />
                <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text><strong>${producto.precio.toLocaleString('es-CL')} CLP</strong></Card.Text>
                <Button variant="primary">Agregar al carrito</Button>
                </Card.Body>
            </Card>
            ))}
        </div>
        </div>
    );
}


export default Productos;
