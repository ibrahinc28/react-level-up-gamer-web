import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom'; 
import Productos from './components/Productos';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    });

    afterEach(() => {
    document.body.removeChild(container);
    container = null;
    });

    describe('Componente Productos', () => {
    it('renderiza correctamente el título y los productos', (done) => {
        act(() => {
        createRoot(container).render(
            <MemoryRouter>
            <Productos />
            </MemoryRouter>
        );
        });

        setTimeout(() => {
        const h1 = container.querySelector('h1');
        expect(h1).not.toBeNull();
        expect(h1.textContent).toBe('Productos');

        const cards = container.querySelectorAll('.card');
        expect(cards.length > 0).toBe(true); // Jasmine compatible

        const firstCard = cards[0];
        expect(firstCard.textContent).toContain('CLP');

        done();
        }, 0);
    });
});
