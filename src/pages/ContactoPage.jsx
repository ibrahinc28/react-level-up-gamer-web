import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Card, Toast } from 'react-bootstrap';

const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactoPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);

    // Maneja el cambio en los inputs del formulario
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
        // Limpia el error cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    }, [errors]);

    // Función de validación del formulario
    const validateForm = useCallback(() => {
        let newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Debe ingresar un email válido.';
            isValid = false;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'El asunto es obligatorio.';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es obligatorio.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [formData]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Aquí se simularía el envío de datos a un servidor o API
            console.log('Datos enviados:', formData);
            setShowToast(true); // Muestra la notificación de éxito
            setFormData(initialFormData); // Resetea el formulario
        }
    };

    const contactInfo = [
        { icon: '📍', title: 'Ubicación Central', text: 'Gran Vía 52, Madrid, España' },
        { icon: '📧', title: 'Soporte Email', text: 'soporte@level-up-gamer.com' },
        { icon: '🕒', title: 'Horario', text: 'Lunes a Viernes: 10:00 - 18:00 HRS' },
    ];

    return (
        <Container className="my-5 p-4 neon-border-box">
            <h1 className="text-center neon-text mb-4">Contáctanos - Soporte Rápido</h1>
            <p className="text-center text-light mb-5">
                ¿Tienes preguntas sobre un pedido, una consola o un juego retro? Nuestro equipo de soporte está listo.
            </p>

            <Row className="justify-content-center">
                
                {/* Columna de Información de Contacto */}
                <Col lg={5} className="mb-4">
                    <h2 className="neon-text-secondary mb-4">Nuestra Información</h2>
                    {contactInfo.map((item, index) => (
                        <Card key={index} className="bg-dark text-light border-neon-secondary mb-3 p-3">
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{item.icon}</span>
                                <div>
                                    <Card.Title className="text-warning mb-0">{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <h2 className="neon-text-secondary mt-5 mb-3">Síguenos</h2>
                    <div className="d-flex social-icons">
                        {/* Sustitución de iconos FontAwesome por emojis o texto para evitar errores de compilación */}
                        <span className="social-icon">🕹️ Discord</span>
                        <span className="social-icon">🎥 YouTube</span>
                        <span className="social-icon">👾 Twitch</span>
                    </div>
                </Col>

                {/* Columna de Formulario */}
                <Col lg={7}>
                    <Card className="bg-dark text-light border-neon-primary p-4 shadow-lg">
                        <Card.Body>
                            <Card.Title className="neon-text-primary mb-4">Envíanos un Mensaje</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                {/* Campo Nombre */}
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tu nombre completo"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        className="bg-gray-800 text-light border-neon-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                {/* Campo Email */}
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        className="bg-gray-800 text-light border-neon-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                
                                {/* Campo Asunto */}
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Título de tu consulta"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        isInvalid={!!errors.subject}
                                        className="bg-gray-800 text-light border-neon-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                                </Form.Group>

                                {/* Campo Mensaje */}
                                <Form.Group className="mb-4" controlId="formMessage">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        placeholder="Escribe tu consulta aquí..."
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        isInvalid={!!errors.message}
                                        className="bg-gray-800 text-light border-neon-input"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                </Form.Group>

                                {/* Botón de Envío */}
                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" className="neon-button-primary">
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Toast de confirmación (sustituye a alert()) */}
            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                delay={4000} 
                autohide
                className="toast-custom"
            >
                <Toast.Header closeButton={false} className="bg-success text-light border-0">
                    <strong className="me-auto">¡Mensaje Enviado!</strong>
                </Toast.Header>
                <Toast.Body className="bg-dark text-light border-0">
                    Gracias por contactarnos. Responderemos pronto.
                </Toast.Body>
            </Toast>
        </Container>
    );
}

// **Esta línea es esencial para solucionar tu error de "element type is invalid"**
export default ContactoPage;