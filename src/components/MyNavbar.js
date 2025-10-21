<<<<<<< HEAD
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../images/logo.png';
import productoIcon from '../images/producto.png';
import carritoIcon from '../images/carrito.png';
import blogIcon from '../images/blog.png';
import contactoIcon from '../images/contacto.png';
import loginIcon from '../images/login.png'; 
=======
// src/components/Navbar.js
import React from 'react';
//import { Navbar, Nav, Container } from 'react-bootstrap';
import { Navbar , Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

>>>>>>> origin/dev


function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#000000' }}>
        <Container>
<<<<<<< HEAD
            <Navbar.Brand href="#home" style={{ fontFamily: "'Orbitron', sans-serif", color: '#39FF14' }}>
            <img src={logo} alt="Level Up Gamer" style={{ height: '100px' }} />
=======
            <Navbar.Brand as={Link} to="/" style={{ fontFamily: "'Orbitron', sans-serif", color: '#39FF14' }}>
            <img src='/images/logo.png' alt="Level Up Gamer" style={{ height: '100px' }} />
>>>>>>> origin/dev
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
<<<<<<< HEAD
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
=======
                <Nav.Link as={Link} to="/" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center'}}>
                    <img src='/images/logo.png' alt="Home" style={{ width: '50px', height: '40px', marginRight: '8px' }} />
                    Home
                </Nav.Link>

                <Nav.Link as={Link} to="/productos" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center' }}>
                    <img src='/images/producto.png' alt="Home" style={{ width: '30px', height: '32px', marginRight: '8px' }} />
                    Productos
                </Nav.Link>

                <Nav.Link href="/carrito" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center'}}>
                    <img src='/images/carrito.png' alt="Home" style={{ width: '30px', height: '28px', marginRight: '8px'}} />
                    Carrito
                </Nav.Link>

                <Nav.Link href="/blog" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center' }}>
                    <img src='/images/blog.png' alt="Home" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                    Blog
                </Nav.Link>

                <Nav.Link href="/contacto" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center' }}>
                    <img src='/images/contacto.png' alt="Home" style={{ width: '25px', height: '25px', marginRight: '8px'}} />
                    Contacto
                </Nav.Link>
                <Nav.Link href="/user" style={{ color: '#1E90FF', fontFamily: "'Roboto', sans-serif", display: 'flex', alignItems: 'center' }}>
                    <img src='/images/login.png' alt="Home" style={{ width: '25px', height: '25px', marginRight: '8px'}} />
                    Iniciar Sesion
                </Nav.Link>
            </Nav>

        </Navbar.Collapse>
        </Container>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ backgroundColor: '#000000' }}>
        <Container>
            <Navbar.Brand as={Link} to="/">
            {/*<img src={logo} alt="Level Up Gamer" style={{ height: '40px' }} />*/}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* Tus enlaces aquí */}
            </Nav>
            {/* Buscador */}
            <Form className="d-flex" style={{ minWidth: '300px' }}>
                <FormControl
                type="search"
                placeholder="Buscar productos"
                className="me-2"
                aria-label="Buscar"
                />
                <Button variant="success">Buscar</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        </Navbar>
    );
}

export default MyNavbar;

>>>>>>> origin/dev
