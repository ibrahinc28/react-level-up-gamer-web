import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegistrarFormulario() {
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
       <Container>
        <Row>
          <p style={{fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>Iniciar sesión</p>
          <Col>
            <Form>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Primer nombre" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSecondName">
                  <Form.Label>Segundo Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Segundo nombre"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control type="text" placeholder="Apellido Paterno" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSecondLastName">
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control type="text" placeholder="Apellido Materno" required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@correo.com" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" style={{textAlign: 'left'}}>
                  <Form.Check
                    required
                    label="Acepto los términos y condiciones"
                    feedback="Debe aceptar los términos."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={{alignItems:'left'}}>
                  Iniciar sesión
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
       </Container>
    </div>
  );
}

export default RegistrarFormulario;