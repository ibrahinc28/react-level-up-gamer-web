

import React from 'react';
import { useParams } from 'react-router-dom';
import { productos } from './ProductosData';
import { Card, Button, Container } from 'react-bootstrap';

function DetalleProducto() {
    const { codigo } = useParams();
    const producto = productos.find(p => p.codigo === codigo);

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
        >
        <Card key={producto.codigo} style={{ width: '18rem', margin: '10px' }}>
            <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{ height: '300px', width: '100%', objectFit: 'contain' }}
            />
            <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>{producto.descripcion}</Card.Text>
            <Card.Text><strong>${producto.precio.toLocaleString('es-CL')} CLP</strong></Card.Text>
            <Button variant="primary">Agregar al carrito</Button>
            </Card.Body>
        </Card>
        </Container>
    );
}

export default DetalleProducto;

