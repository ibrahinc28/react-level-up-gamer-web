import React, { useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, XCircle } from 'lucide-react';

const initialFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CustomToast = ({ show, onClose, type, title, message }) => {
    if (!show) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl max-w-sm z-50 transition-opacity duration-300";
    const typeClasses = {
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
    };
    const Icon = type === 'success' ? CheckCircle : XCircle;

    React.useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onClose(), 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center">
                    <Icon className="w-6 h-6 mr-2" />
                    <strong className="font-bold mr-auto">{title}</strong>
                </div>
                <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition">
                    &times;
                </button>
            </div>
            <p className="mt-2 text-sm">{message}</p>
        </div>
    );
};


function ContactoPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        setShowToast(false);
        setShowErrorToast(false);

        if (!validateForm()) return;
        
        setIsSubmitting(true);

        const API_URL = 'http://localhost:8080/api/contactos'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
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
        { icon: MapPin, title: 'Ubicación Central', text: 'Av. Antonio Varas #303, Of. 606' },
        { icon: Phone, title: 'Línea Directa', text: '+56 9 1234 5678' },
        { icon: Mail, title: 'Soporte Email', text: 'contacto@levelupgamer.cl' },
        { icon: Clock, title: 'Horario', text: 'Lunes a Viernes: 10:00 - 18:00 HRS' },
    ];
    
    const socialIcons = [
        { name: 'Facebook', icon: '📘' },
        { name: 'Instagram', icon: '📸' },
        { name: 'X (Twitter)', icon: '🐦' },
        { name: 'Discord', icon: '🕹️' },
        { name: 'YouTube', icon: '🎥' },
        { name: 'Twitch', icon: '👾' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 font-[Inter]">
            
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-3">Contáctanos - Soporte Rápido</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    ¿Tienes preguntas sobre un pedido, una consola o un juego retro? Nuestro equipo de soporte está listo.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-5">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl h-full border border-indigo-200 dark:border-indigo-900/50">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-indigo-400/30 pb-3">Nuestra Información</h2>
                        
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition duration-200 hover:shadow-md">
                                    <item.icon className="w-6 h-6 text-indigo-500 mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b border-indigo-400/30 pb-3">Síguenos</h2>
                        <div className="flex flex-wrap gap-4 social-icons">
                            {socialIcons.map((item, index) => (
                                <span key={index} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-700 transition">
                                    {item.icon} {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-indigo-200 dark:border-indigo-900/50">
                        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Envíanos un Mensaje</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Tu nombre completo"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-150 ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-150 ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Título de tu consulta"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-150 ${errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Escribe tu consulta aquí..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition duration-150 ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                ></textarea>
                                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center 
                                  ${isSubmitting
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50'
                                  }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Enviar Mensaje
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <CustomToast
                show={showToast}
                onClose={() => setShowToast(false)}
                type="success"
                title="¡Mensaje Enviado!"
                message="Gracias por contactarnos. Responderemos pronto."
            />
            
            <CustomToast
                show={showErrorToast}
                onClose={() => setShowErrorToast(false)}
                type="error"
                title="¡Error!"
                message="No se pudo enviar el mensaje. Verifica tu conexión e intenta nuevamente."
            />
        </div>
    );
}

export default ContactoPage;