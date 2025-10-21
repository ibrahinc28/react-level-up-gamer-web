import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import ContactoPage from '../pages/ContactoPage';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    });

    afterEach(() => {
    document.body.removeChild(container);
    container = null;
    });

    describe('ContactoPage', () => {

    it('renderiza el título, formulario e info de contacto', (done) => {
        act(() => {
        createRoot(container).render(<ContactoPage />);
        });

        setTimeout(() => {
        expect(container.textContent).toMatch(/Contáctanos - Soporte Rápido/i);
        expect(container.querySelector('button').textContent).toMatch(/Enviar Mensaje/i);
        expect(container.querySelector('input[name="nombre"]')).toBeTruthy();
        expect(container.textContent).toMatch(/\+56 9 1234 5678/i);
        done();
        }, 0);
    });

    it('actualiza el input Nombre al escribir', (done) => {
        act(() => {
        createRoot(container).render(<ContactoPage />);
        });

        setTimeout(() => {
        const input = container.querySelector('input[name="nombre"]');
        input.value = 'Jane Doe';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        expect(input.value).toBe('Jane Doe');
        done();
        }, 0);
    });

    it('muestra errores de validación si se envía vacío', (done) => {
        act(() => {
        createRoot(container).render(<ContactoPage />);
        });

        setTimeout(() => {
        container.querySelector('button').click();

        expect(container.textContent).toMatch(/El nombre es obligatorio./i);
        expect(container.textContent).toMatch(/Debe ingresar un email válido./i);
        expect(container.textContent).toMatch(/El mensaje es obligatorio./i);
        done();
        }, 100);
    });

    it('muestra error si se introduce email inválido', (done) => {
        act(() => {
        createRoot(container).render(<ContactoPage />);
        });

        setTimeout(() => {
        const input = container.querySelector('input[name="email"]');
        input.value = 'test@invalido';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        container.querySelector('button').click();

        expect(container.textContent).toMatch(/Debe ingresar un email válido./i);
        done();
        }, 100);
    });

    it('simula envío exitoso, muestra mensaje y resetea formulario', (done) => {
        spyOn(console, 'log');

        act(() => {
        createRoot(container).render(<ContactoPage />);
        });

        setTimeout(() => {
        container.querySelector('input[name="nombre"]').value = 'Gamer Pro';
        container.querySelector('input[name="nombre"]').dispatchEvent(new Event('input', { bubbles: true }));

        container.querySelector('input[name="email"]').value = 'gamer@levelup.cl';
        container.querySelector('input[name="email"]').dispatchEvent(new Event('input', { bubbles: true }));

        container.querySelector('input[name="asunto"]').value = 'Pregunta de stock';
        container.querySelector('input[name="asunto"]').dispatchEvent(new Event('input', { bubbles: true }));

        container.querySelector('textarea[name="mensaje"]').value = 'Necesito saber si tienen...';
        container.querySelector('textarea[name="mensaje"]').dispatchEvent(new Event('input', { bubbles: true }));

        container.querySelector('button').click();

        expect(console.log).toHaveBeenCalledWith('Datos enviados:', jasmine.objectContaining({
            name: 'Gamer Pro',
            email: 'gamer@levelup.cl',
            subject: 'Pregunta de stock',
            message: 'Necesito saber si tienen...',
        }));

        expect(container.textContent).toMatch(/¡Mensaje Enviado!/i);
        expect(container.querySelector('input[name="nombre"]').value).toBe('');

        console.log.calls.reset();
        done();
        }, 200);
    });

});
