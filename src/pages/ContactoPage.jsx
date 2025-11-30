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
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    }, [errors]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('http://localhost:8080/api/contactos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowToast(true);
                setFormData(initialFormData);
            } else {
                setShowErrorToast(true);
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setShowErrorToast(true);
        }
    };

    const contactInfo = [
        { icon: '📍', title: 'Ubicación Central', text: 'Av. Antonio Varas #303, Of. 606' },
        { icon: '📞', title: 'Línea Directa', text: '+56 9 1234 5678' },
        { icon: '📧', title: 'Soporte Email', text: 'contacto@levelupgamer.cl' },
        { icon: '🕒', title: 'Horario', text: 'Lunes a Viernes: 10:00 - 18:00 HRS' },
    ];

    return (
        <Container className="my-5 p-4 border-box">
            <h1 className="text-center highlight-text mb-4">Contáctanos - Soporte Rápido</h1>
            <p className="text-center text-light mb-5">
                ¿Tienes preguntas sobre un pedido, una consola o un juego retro? Nuestro equipo de soporte está listo.
            </p>

            <Row className="justify-content-center">
                <Col lg={5} className="mb-4">
                    <h2 className="text-secondary mb-4">Nuestra Información</h2>
                    {contactInfo.map((item, index) => (
                        <Card key={index} className="bg-dark text-light border-secondary mb-3 p-3">
                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{item.icon}</span>
                                <div>
                                    <Card.Title className="text-warning mb-0">{item.title}</Card.Title>
                                    <Card.Text>{item.text}</Card.Text>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <h2 className="text-secondary mt-5 mb-3">Síguenos</h2>
                    <div className="d-flex social-icons">
                        <span className="social-icon">📘 Facebook</span>
                        <span className="social-icon">📸 Instagram</span>
                        <span className="social-icon">🐦 X (Twitter)</span>
                        <span className="social-icon">🕹️ Discord</span>
                        <span className="social-icon">🎥 YouTube</span>
                        <span className="social-icon">👾 Twitch</span>
                    </div>
                </Col>

                <Col lg={7}>
                    <Card className="bg-dark text-light border-primary p-4 shadow-lg">
                        <Card.Body>
                            <Card.Title className="text-primary mb-4">Envíanos un Mensaje</Card.Title>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Tu nombre completo"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Título de tu consulta"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        isInvalid={!!errors.subject}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                                </Form.Group>

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
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" className="button-primary">
                                        Enviar Mensaje
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

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

            <Toast 
                onClose={() => setShowErrorToast(false)} 
                show={showErrorToast} 
                delay={4000} 
                autohide
                className="toast-custom"
            >
                <Toast.Header closeButton={false} className="bg-danger text-light border-0">
                    <strong className="me-auto">¡Error!</strong>
                </Toast.Header>
                <Toast.Body className="bg-dark text-light border-0">
                    No se pudo enviar el mensaje. Intenta nuevamente.
                </Toast.Body>
            </Toast>
        </Container>
    );
}

export default ContactoPage;