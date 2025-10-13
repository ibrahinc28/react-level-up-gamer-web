import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactoPage from './ContactoPage';
import '@testing-library/jest-dom';

describe('ContactoPage', () => {

    it('debe renderizar el título, el formulario y la información de contacto', () => {
        render(<ContactoPage />);
        expect(screen.getByText(/Contáctanos - Soporte Rápido/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByText(/\+569 1345678/i)).toBeInTheDocument();
    });

    it('debe actualizar el valor del input Nombre al escribir', () => {
        render(<ContactoPage />);
        const nameInput = screen.getByLabelText(/Nombre/i);
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        expect(nameInput.value).toBe('Jane Doe');
    });

    it('debe mostrar errores de validación si el formulario se envía vacío', () => {
        render(<ContactoPage />);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
        fireEvent.click(submitButton);

        expect(screen.getByText(/El nombre es obligatorio./i)).toBeInTheDocument();
        expect(screen.getByText(/Debe ingresar un email válido./i)).toBeInTheDocument();
        expect(screen.getByText(/El mensaje es obligatorio./i)).toBeInTheDocument();
    });

    it('debe mostrar error si se introduce un email inválido', () => {
        render(<ContactoPage />);
        const emailInput = screen.getByLabelText(/Email/i);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
        fireEvent.change(emailInput, { target: { value: 'test@invalido' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Debe ingresar un email válido./i)).toBeInTheDocument();
    });

    it('debe simular el envío exitoso, mostrar el toast y resetear el formulario', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        render(<ContactoPage />);

        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Gamer Pro' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'gamer@levelup.cl' } });
        fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Pregunta de stock' } });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Necesito saber si tienen...' } });

        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

        fireEvent.click(submitButton);

        expect(logSpy).toHaveBeenCalledWith('Datos enviados:', {
            name: 'Gamer Pro',
            email: 'gamer@levelup.cl',
            subject: 'Pregunta de stock',
            message: 'Necesito saber si tienen...',
        });

        expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre/i).value).toBe('');
        logSpy.mockRestore();
    });
});