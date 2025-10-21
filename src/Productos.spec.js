import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Productos from './components/Productos';

describe('Componente Productos', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('renderiza correctamente el título y los productos', (done) => {
        ReactDOM.render(
        <MemoryRouter>
            <Productos />
        </MemoryRouter>,
        container
        );

        setTimeout(() => {
        const h1 = container.querySelector('h1');
        expect(h1).not.toBeNull();
        expect(h1.textContent).toBe('Productos');

        const cards = container.querySelectorAll('.card');
        expect(cards.length).toBeGreaterThan(0);

        expect(cards[0].textContent).toContain('CLP');

        done();
        }, 0);
    });
});
