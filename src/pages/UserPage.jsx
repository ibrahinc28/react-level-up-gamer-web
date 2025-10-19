import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function user() {
  return (
    <div>
      <Container>
      <Row>
        <Col>Historial de compras:
        <ListGroup>
              <ListGroup.Item action>Controlador Inalámbrico Xbox Series X</ListGroup.Item>
              <ListGroup.Item action>Auriculares Gamer HyperX Cloud II</ListGroup.Item>
              <ListGroup.Item action>PlayStation 5</ListGroup.Item>
              <ListGroup.Item action>Polera Gamer Personalizada 'Level-Up'</ListGroup.Item>
              <ListGroup.Item action>Silla Gamer Secretlab Titan</ListGroup.Item>
              <ListGroup.Item action>Carcassonne</ListGroup.Item>
              <ListGroup.Item action>Catan</ListGroup.Item>
              <ListGroup.Item disabled>...</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <p style={{fontSize: 35, fontWeight: 'bold', textAlign: 'left'}}>Pedro Ignacio Contreras Zuñiga</p>
          <Image src="images/pedro.png" width={449} height={675} rounded />
          <p style={{fontSize: 30, textAlign: 'left'}}>Usuario</p>
          <p style={{fontSize: 20, textAlign: 'left'}}>Registrado desde: 13 Octubre 2024</p>
          <p style={{fontSize: 20, textAlign: 'left'}}>Correo: pedrocontreras@gmail.com</p>
          <Button variant="outline-secondary" style={{alignContent: 'left'}}>Editar</Button>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default user