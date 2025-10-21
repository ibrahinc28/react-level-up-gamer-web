import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function RegistrarFormulario() {
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
          <p style={{fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>Registrarse</p>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Primer nombre" required/>
                  <Form.Control.Feedback type='invalid'>Por favor ingrese su nombre</Form.Control.Feedback>
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
                  <Form.Control.Feedback type='invalid'>Por favor ingrese su apellido paterno</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSecondLastName">
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control type="text" placeholder="Apellido Materno" required/>
                  <Form.Control.Feedback type='invalid'>Por favor ingrese su apellido materno</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
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
                <Button variant="primary" type="submit" style={{alignItems:'left'}} >
                  Iniciar sesión
                </Button>
              </Col>
            </Form>
            <p>¿Ya tiene una cuenta? Inicie sesión <a href='/login'>aquí.</a></p>
          </Col>
        </Row>
       </Container>
    </div>
  );
}
   

export default RegistrarFormulario;