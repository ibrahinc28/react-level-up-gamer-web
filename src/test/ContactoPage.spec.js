import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ContactoPage from '../pages/ContactoPage';

describe('ContactoPage', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renderiza el título, formulario e info de contacto', () => {
        render(<ContactoPage />, { wrapper: MemoryRouter });

        expect(screen.getByText(/Contáctanos - Soporte Rápido/i)).toBeDefined();
        expect(screen.getByRole('button')).toHaveTextContent(/Enviar Mensaje/i);
        expect(screen.getByRole('textbox', { name: /nombre/i })).toBeDefined();
        expect(screen.getByText(/\+56 9 1234 5678/i)).toBeDefined();
    });

    it('actualiza el input Nombre al escribir', () => {
        render(<ContactoPage />, { wrapper: MemoryRouter });

        const input = screen.getByRole('textbox', { name: /nombre/i });
        fireEvent.change(input, { target: { value: 'Jane Doe' } });
        expect(input.value).toBe('Jane Doe');
    });

    it('muestra errores de validación si se envía vacío', () => {
        render(<ContactoPage />, { wrapper: MemoryRouter });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByText(/El nombre es obligatorio./i)).toBeDefined();
        expect(screen.getByText(/Debe ingresar un email válido./i)).toBeDefined();
        expect(screen.getByText(/El mensaje es obligatorio./i)).toBeDefined();
    });

    it('muestra error si se introduce email inválido', () => {
        render(<ContactoPage />, { wrapper: MemoryRouter });

        const inputEmail = screen.getByRole('textbox', { name: /email/i });
        fireEvent.change(inputEmail, { target: { value: 'test@invalido' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(screen.getByText(/Debe ingresar un email válido./i)).toBeDefined();
    });

    it('simula envío exitoso, muestra mensaje y resetea formulario', () => {
    render(<ContactoPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByRole('textbox', { name: /nombre/i }), { target: { value: 'Gamer Pro' } });
    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { target: { value: 'gamer@levelup.cl' } });
    fireEvent.change(screen.getByRole('textbox', { name: /asunto/i }), { target: { value: 'Pregunta de stock' } });
    fireEvent.change(screen.getByRole('textbox', { name: /mensaje/i }), { target: { value: 'Necesito saber si tienen...' } });

    fireEvent.click(screen.getByRole('button'));

    expect(console.log).toHaveBeenCalledWith('Datos enviados:', expect.objectContaining({
        name: 'Gamer Pro',
        email: 'gamer@levelup.cl',
        subject: 'Pregunta de stock',
        message: 'Necesito saber si tienen...',
        }));

        expect(screen.getByRole('textbox', { name: /nombre/i }).value).toBe('');
        expect(screen.getByText(/¡Mensaje Enviado!/i)).toBeDefined();
    });
});
