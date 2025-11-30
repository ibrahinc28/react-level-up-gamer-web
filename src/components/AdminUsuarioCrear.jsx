import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AdminUsuarioCrear() {
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
            <p style={{textAlign: 'left', fontSize: 12}}>El identificador único se creará de manera automática</p>
            <Form.Group className="mb-3" controlId="nombreUsuario">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" placeholder="Nombres" required/>
                <Form.Control.Feedback type='invalid'>Se requiere el código del producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="apellidoUsuario">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" placeholder="Apellidos" required/>
                <Form.Control.Feedback type='invalid'>Se requiere una categoría para el producto</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="correoUsuario">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com" required/>
                <Form.Control.Feedback type='invalid'>El correo no es válido</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contrasenaUsuario">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" required/>
                <Form.Control.Feedback type='invalid'>Se necesita una contraseña</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="rolUsuario">
                <Form.Label>Rol(es)</Form.Label>
                <Form.Control type="text" placeholder="Roles" required/>
                <Form.Control.Feedback type='invalid'>Se debe asignar un rol</Form.Control.Feedback>
            </Form.Group>
                <Button variant="primary" style={{alignItems:'right'}} >
                Crear
                </Button>
        </Form>
    </div>
  )
}

export default AdminUsuarioCrear