import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginFormulario() {

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
          navigate('/user');
        }

    setValidated(true);
  };
  
    return (
    <div>
       <Container>
        <Row>
          <p style={{fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>Iniciar sesión</p>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@correo.com" required/>
                <Form.Control.Feedback type='invalid'>El correo no es válido</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" required/>
                <Form.Control.Feedback type='invalid'>Debe ingresar una contraseña</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" style={{alignItems:'left'}}>
                Iniciar sesión
              </Button>
            </Form>
          </Col>
        </Row>
       </Container>
    </div>
  )
}

export default LoginFormulario
