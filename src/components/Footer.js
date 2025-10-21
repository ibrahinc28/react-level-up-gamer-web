import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#000000', color: '#D3D3D3', padding: '40px 20px 20px', fontFamily: "'Roboto', Arial, sans-serif" }}>
        <Container className="footer-container" style={{ maxWidth: '1200px', margin: 'auto', gap: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Col md={3} sm={6} className="footer-section">
            <h2 style={{ color: '#1E90FF', fontFamily: "'Orbitron', sans-serif" }}>Level Up Gamer</h2>
            <p>La mejor tienda de hardware y gaming.</p>
            </Col>

            <Col md={2} sm={6} className="footer-section">
            <h4 style={{ color: '#1E90FF', fontFamily: "'Orbitron', sans-serif" }}>Enlaces</h4>
            <Nav className="flex-column">
                <Nav.Link href="index.html" style={{ color: '#D3D3D3', padding: '0', marginBottom: '8px' }}>Inicio</Nav.Link>
                <Nav.Link href="productos.html" style={{ color: '#D3D3D3', padding: '0', marginBottom: '8px' }}>Productos</Nav.Link>
                <Nav.Link href="#" style={{ color: '#D3D3D3', padding: '0', marginBottom: '8px' }}>Marcas</Nav.Link>
                <Nav.Link href="contacto.html" style={{ color: '#D3D3D3', padding: '0', marginBottom: '8px' }}>Contacto</Nav.Link>
            </Nav>
            </Col>

            <Col md={3} sm={6} className="footer-section" style={{ marginBottom: '15px' }}>
            <iframe
                title="Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d13383.092123816954!2d-71.54892111316633!3d-33.00975888170049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1ses-419!2scl!4v1757960878831!5m2!1ses-419!2scl"
                width="100%"
                height="150"
                style={{ border: '2px solid #39FF14', borderRadius: '12px', boxShadow: '0 0 8px #1E90FF' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </Col>

            <Col md={2} sm={6} className="footer-section">
            <h4 style={{ color: '#1E90FF', fontFamily: "'Orbitron', sans-serif" }}>Contacto</h4>
            <p>Teléfono: +56 9 1234 5678</p>
            <p>Email: contacto@levelupgamer.cl</p>
            </Col>

            <Col md={2} sm={6} className="footer-section redes-sociales" style={{ marginBottom: '15px' }}>
            <h4 style={{ color: '#1E90FF', fontFamily: "'Orbitron', sans-serif" }}>Síguenos</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
                <a href="#" aria-label="Facebook" style={{ width: '30px', height: '30px', display: 'inline-block', cursor: 'pointer' }}>
                <img src="/images/facebook.png" alt="Facebook" style={{ width: '100%', filter: 'brightness(70%)', transition: 'filter 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'brightness(100%)'} onMouseOut={e => e.currentTarget.style.filter = 'brightness(70%)'} />
                </a>
                <a href="#" aria-label="Instagram" style={{ width: '30px', height: '30px', display: 'inline-block', cursor: 'pointer' }}>
                <img src="/images/instagram.png" alt="Instagram" style={{ width: '100%', filter: 'brightness(70%)', transition: 'filter 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'brightness(100%)'} onMouseOut={e => e.currentTarget.style.filter = 'brightness(70%)'} />
                </a>
                <a href="#" aria-label="Twitter" style={{ width: '30px', height: '30px', display: 'inline-block', cursor: 'pointer' }}>
                <img src="/images/xtwitter.png" alt="Twitter" style={{ width: '100%', filter: 'brightness(70%)', transition: 'filter 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'brightness(100%)'} onMouseOut={e => e.currentTarget.style.filter = 'brightness(70%)'} />
                </a>
            </div>
            </Col>
        </Container>
        <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.9rem', color: '#555' }}>
            <p>&copy; 2025 LevelUpGamer. Todos los derechos reservados.</p>
        </div>
        </footer>
    );
};

<<<<<<< HEAD
export default Footer;
=======
export default Footer;
>>>>>>> origin/dev
