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
