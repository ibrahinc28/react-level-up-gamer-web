import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../images/logo.png';
import productoIcon from '../images/producto.png';
import carritoIcon from '../images/carrito.png';
import blogIcon from '../images/blog.png';
import contactoIcon from '../images/contacto.png';
import loginIcon from '../images/login.png'; 

function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#000000' }}>
        <Container>
            <Navbar.Brand href="#home" style={{ fontFamily: "'Orbitron', sans-serif", color: '#39FF14' }}>
            <img src={logo} alt="Level Up Gamer" style={{ height: '100px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={logo} alt="Home" style={{ width: '32px', marginRight: '8px' }} />
                    Home
                </Nav.Link>

                <Nav.Link href="#productos" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={productoIcon} alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                    Productos
                </Nav.Link>

                <Nav.Link href="#carrito" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={carritoIcon} alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                    Carrito
                </Nav.Link>

                <Nav.Link href="#blog" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={blogIcon} alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                    Blog
                </Nav.Link>

                <Nav.Link href="#contacto" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={contactoIcon} alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                    Contacto
                </Nav.Link>
                <Nav.Link href="#iniciarsesion" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif" }}>
                    <img src={loginIcon} alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                    Iniciar Sesion
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default MyNavbar;