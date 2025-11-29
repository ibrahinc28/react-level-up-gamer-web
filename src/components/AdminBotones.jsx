import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import AdminProductoCrear from './AdminProductoCrear';
import AdminProductoEditar from './AdminProductoEditar';
import AdminProductoEliminar from './AdminProductoEliminar';
import AdminUsuarioCrear from './AdminUsuarioCrear';
import AdminUsuarioEditar from './AdminUsuarioEditar';
import AdminUsuarioEliminar from './AdminUsuarioEliminar';


function AdminBotones() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p style={{fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>Modo administrador</p>
      <Button variant="primary" onClick={handleShow} style={{alignContent: 'center'}}>
        Productos
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Productos</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Crear producto</Accordion.Header>
              <Accordion.Body>
                <AdminProductoCrear />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Editar producto</Accordion.Header>
              <Accordion.Body>
                <AdminProductoEditar />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Eliminar producto</Accordion.Header>
              <Accordion.Body>
                <AdminProductoEliminar />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Button variant="primary" onClick={handleShow} style={{alignContent: 'center'}}>
        Usuarios
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuarios</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Accordion>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Crear usuario</Accordion.Header>
              <Accordion.Body>
                <AdminUsuarioCrear />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Editar usuario</Accordion.Header>
              <Accordion.Body>
                <AdminUsuarioEditar />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Eliminar usuario</Accordion.Header>
              <Accordion.Body>
                <AdminUsuarioEliminar />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Finalizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminBotones;