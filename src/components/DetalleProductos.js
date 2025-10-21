import React from 'react';
import { useParams } from 'react-router-dom';
import { productos } from './ProductosData';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



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
            <Card.Title style={{ color: '#000', opacity: 1 }}>{producto.nombre}</Card.Title>
            <Card.Text style={{ color: '#000', opacity: 1 }}>{producto.descripcion}</Card.Text>
            <Card.Text style={{ color: '#000', opacity: 1 }}><strong> Precio: ${producto.precio.toLocaleString('es-CL')} CLP</strong></Card.Text>
            <Link to="/productos">
                <Button variant="secondary">Volver</Button>
            </Link>
            </Card.Body>
        </Card>
        </Container>
    );
}

export default DetalleProducto;

