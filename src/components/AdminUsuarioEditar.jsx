import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AdminUsuarioEditar() {
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
            <p style={{textAlign: 'left', fontSize: 12}}>Solo los campos no vacíos serán editados</p>
            <Form.Group className="mb-3" controlId="idUsuarioEditar">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="Número" required/>
                <Form.Control.Feedback type='invalid'>Se requiere la ID del usuario</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombreUsuarioEditar">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombres"/>
                <Form.Control.Feedback type='invalid'>Se requiere una categoría para el producto</Form.Control.Feedback>
            </Form.Group>
                <Form.Group className="mb-3" controlId="apellidoUsuarioEditar">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos"/>
                <Form.Control.Feedback type='invalid'>Se requiere una categoría para el producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="correoUsuarioEditar">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com"/>
                <Form.Control.Feedback type='invalid'>El correo no es válido</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contrasenaUsuarioEditar">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña"/>
                <Form.Control.Feedback type='invalid'>Se necesita una contraseña</Form.Control.Feedback>
            </Form.Group>
                <Button variant="primary" style={{alignItems:'right'}} >
                Editar
                </Button>
        </Form>
    </div>
  )
}

export default AdminUsuarioEditar