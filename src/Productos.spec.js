import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Productos from './components/Productos';

// Crear un contenedor DOM para montar el componente durante el test
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
    it('renderiza correctamente el título y los productos', () => {
        act(() => {
        createRoot(container).render(<Productos />);
        });

        // Verifica que el título esté renderizado
        expect(container.querySelector('h1').textContent).toBe('Productos');

        // Verifica que haya al menos una card (producto) en el renderizado
        const cards = container.querySelectorAll('.card');
        expect(cards.length).toBeGreaterThan(0);

        // Verifica el contenido de la primera card
        const firstCard = cards[0];
        expect(firstCard.textContent).toContain('CLP'); // Precio mostrado
    });
});
