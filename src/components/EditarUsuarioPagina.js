import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';

function EditarUsuarioPagina() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
  
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
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <Form.Group className="mb-3" controlId="formBasicThirdName">
                  <Form.Label>Tercer Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Tercer nombre"/>
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
              </Col>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
   

export default EditarUsuarioPagina;