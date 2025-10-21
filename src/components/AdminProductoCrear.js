import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AdminProductoCrear() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };
  
    return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="codProducto">
                <Form.Label>Código de producto</Form.Label>
                <Form.Control type="text" placeholder="Número" required/>
                <Form.Control.Feedback type='invalid'>Se requiere el código del producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categoriaProducto">
                <Form.Label>Categoría</Form.Label>
                <Form.Control type="text" placeholder="Categoría" required/>
                <Form.Control.Feedback type='invalid'>Se requiere una categoría para el producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombreProducto">
                <Form.Label>Nombre de producto</Form.Label>
                <Form.Control type="text" placeholder="Nombre" required/>
                <Form.Control.Feedback type='invalid'>Se requiere el nombre</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcionProducto">
                <Form.Label>Descripción de producto</Form.Label>
                <Form.Control type="text" placeholder="Descripción" required/>
                <Form.Control.Feedback type='invalid'>Se requiere una descripción para el producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="precioProducto">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="text" placeholder="$XXXXXXXX" required/>
                <Form.Control.Feedback type='invalid'>Se requiere el precio del producto</Form.Control.Feedback>
            </Form.Group>
                <Button variant="primary" style={{alignItems:'right'}} >
                Añadir
                </Button>
        </Form>
    </div>
  )
}

export default AdminProductoCrear