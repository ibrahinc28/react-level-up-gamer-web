import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AdminProductoEliminar() {
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
            <Form.Group className="mb-3" controlId="codProductoEliminar">
                <Form.Label>Código de producto</Form.Label>
                <Form.Control type="text" placeholder="Número" required/>
                <Form.Control.Feedback type='invalid'>Se requiere el código del producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-6" controlId="razonProductoEliminar">
                <Form.Label>Razón de eliminación</Form.Label>
                <Form.Control type="text" placeholder="Razón de eliminación"/>
            </Form.Group>
                <Button variant="primary" style={{alignItems:'right'}} >
                Eliminar
                </Button>
        </Form>
    </div>
  )
}

export default AdminProductoEliminar