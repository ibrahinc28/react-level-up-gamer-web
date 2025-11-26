import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AdminUsuarioEliminar() {
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
            <Form.Group className="mb-3" controlId="idUsuarioEliminar">
                <Form.Label>ID de usuario</Form.Label>
                <Form.Control type="text" placeholder="Número" required/>
                <Form.Control.Feedback type='invalid'>Se requiere la ID del producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="idUsuarioEliminar">
                <Form.Label>Tiempo (en minutos)</Form.Label>
                <Form.Control type="text" placeholder="Tiempo"/>
                <Form.Control.Feedback type='invalid'>Se debe indicar el tiempo</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" style={{textAlign: 'left'}}>
                  <Form.Check
                    label="Permanente"
                  />
                </Form.Group>
            <Form.Group className="mb-6" controlId="razonProductoEliminar">
                <Form.Label>Motivo de eliminación (opcional)</Form.Label>
                <Form.Control type="text" placeholder="Motivo"/>
            </Form.Group>
                <Button variant="primary" style={{alignItems:'right'}} >
                Eliminar
                </Button>
        </Form>
    </div>
  )
}

export default AdminUsuarioEliminar