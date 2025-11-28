import React, { useState, useCallback, useMemo } from 'react';

const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomToast = ({ show, variant, title, body, onClose }) => {
    const colorClasses = useMemo(() => {
        return variant === 'success'
            ? { header: 'bg-green-600 text-white', body: 'bg-gray-800 text-gray-200' }
            : { header: 'bg-red-600 text-white', body: 'bg-gray-800 text-gray-200' };
    }, [variant]);

    React.useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg shadow-2xl transition-opacity duration-300 ${
                show ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } border-2 border-gray-700`}
            role="alert"
        >
            <div className={`p-3 rounded-t-lg flex justify-between items-center ${colorClasses.header}`}>
                <strong className="text-lg font-semibold me-auto">{title}</strong>
            </div>
            <div className={`p-3 rounded-b-lg ${colorClasses.body}`}>
                {body}
            </div>
        </div>
    );
};


function ContactoPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!validateForm() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8080/api/contactos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowToast(true);
                setFormData(initialFormData);
                setErrors({});
            } else {
                setShowErrorToast(true);
            }
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setShowErrorToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: '📍', title: 'Ubicación Central', text: 'Av. Antonio Varas #303, Of. 606' },
        { icon: '📞', title: 'Línea Directa', text: '+56 9 1234 5678' },
        { icon: '📧', title: 'Soporte Email', text: 'contacto@levelupgamer.cl' },
        { icon: '🕒', title: 'Horario', text: 'Lunes a Viernes: 10:00 - 18:00 HRS' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-inter p-4">
            <style jsx="true">{`
                /* Estilos personalizados para Tailwind */
                .highlight-text { color: #00BFFF; }
                .text-secondary { color: #9CA3AF; }
                .text-warning { color: #FBBF24; }
                .button-primary {
                    background-color: #00BFFF;
                    border-color: #00BFFF;
                    transition: background-color 0.3s;
                }
                .button-primary:hover { background-color: #009ACD; }
                .form-control-custom {
                    @apply w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition;
                }
                .social-icon {
                    @apply text-lg bg-gray-800 p-2 rounded-lg mr-3 mb-3 transition duration-300 hover:bg-blue-500 hover:text-white cursor-pointer shadow-lg;
                }
            `}</style>

            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-4xl font-extrabold text-center highlight-text mb-4">Contáctanos - Soporte Rápido</h1>
                <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
                    ¿Tienes preguntas sobre un pedido, una consola o un juego retro? Nuestro equipo de soporte está listo.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 justify-items-center">

                    <div className="lg:col-span-5 w-full mb-8">
                        <h2 className="text-2xl font-semibold text-secondary mb-4">Nuestra Información</h2>
                        {contactInfo.map((item, index) => (
                            <div key={index} className="bg-gray-800 text-gray-200 border border-gray-700 rounded-xl mb-3 p-3 shadow-md hover:border-blue-400 transition duration-300">
                                <div className="flex items-center">
                                    <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{item.icon}</span>
                                    <div>
                                        <h3 className="text-lg font-bold text-warning mb-0">{item.title}</h3>
                                        <p className="text-sm m-0">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <h2 className="text-2xl font-semibold text-secondary mt-8 mb-3">Síguenos</h2>
                        <div className="flex flex-wrap social-icons">
                            <span className="social-icon">📘 Facebook</span>
                            <span className="social-icon">📸 Instagram</span>
                            <span className="social-icon">🐦 X (Twitter)</span>
                            <span className="social-icon">🕹️ Discord</span>
                            <span className="social-icon">🎥 YouTube</span>
                            <span className="social-icon">👾 Twitch</span>
                        </div>
                    </div>

                    <div className="lg:col-span-7 w-full">
                        <div className="bg-gray-800 text-gray-200 border border-blue-500 rounded-xl p-6 shadow-2xl">
                            <div>
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">Envíanos un Mensaje</h3>
                                
                                <form onSubmit={handleSubmit}>

                                    <div className="mb-4">
                                        <label htmlFor="formName" className="block text-sm font-medium mb-1">Nombre</label>
                                        <input
                                            id="formName"
                                            type="text"
                                            placeholder="Tu nombre completo"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`form-control-custom ${errors.name ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.name && (
                                            <div className="text-red-400 text-sm mt-1">{errors.name}</div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="formEmail" className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            id="formEmail"
                                            type="email"
                                            placeholder="ejemplo@correo.com"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`form-control-custom ${errors.email ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.email && (
                                            <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="formSubject" className="block text-sm font-medium mb-1">Asunto</label>
                                        <input
                                            id="formSubject"
                                            type="text"
                                            placeholder="Título de tu consulta"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`form-control-custom ${errors.subject ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.subject && (
                                            <div className="text-red-400 text-sm mt-1">{errors.subject}</div>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="formMessage" className="block text-sm font-medium mb-1">Mensaje</label>
                                        <textarea
                                            id="formMessage"
                                            rows={4}
                                            placeholder="Escribe tu consulta aquí..."
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`form-control-custom resize-none ${errors.message ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors.message && (
                                            <div className="text-red-400 text-sm mt-1">{errors.message}</div>
                                        )}
                                    </div>

                                    <div className="grid">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="button-primary text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Enviando...
                                                </span>
                                            ) : 'Enviar Mensaje'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomToast
                show={showToast}
                variant="success"
                title="¡Mensaje Enviado!"
                body="Gracias por contactarnos. Responderemos pronto."
                onClose={() => setShowToast(false)}
            />

            <CustomToast
                show={showErrorToast}
                variant="danger"
                title="¡Error!"
                body="No se pudo enviar el mensaje. Intenta nuevamente."
                onClose={() => setShowErrorToast(false)}
            />
        </div>
    );
}

const App = () => <ContactoPage />;
export default App;