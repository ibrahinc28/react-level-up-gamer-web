import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import Home from './components/Home';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    });

    afterEach(() => {
    document.body.removeChild(container);
    container = null;
    });

    describe('Componente Home', () => {
    it('renderiza Productos Destacados y lista de productos', (done) => {
        act(() => {
        createRoot(container).render(
            <MemoryRouter>
            <Home />
            </MemoryRouter>
        );
        });

        setTimeout(() => {
        const title = container.querySelector('h2');
        expect(title.textContent).toBe('Productos Destacados');

        const cards = container.querySelectorAll('.card');
        expect(cards.length > 0).toBe(true); // Jasmine no tiene toBeGreaterThan

        expect(cards[0].textContent).toContain('Catan');
        expect(cards[0].textContent).toContain('$29.990');

        done(); // Finaliza el test asíncrono
        }, 0);
    });
});
