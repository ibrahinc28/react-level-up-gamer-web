import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Categorias from './components/Categorias';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    });

    afterEach(() => {
    document.body.removeChild(container);
    container = null;
    });

    describe('Componente Categorias', () => {
    it('renderiza todas las categorías y productos esperados', (done) => {
        act(() => {
        createRoot(container).render(
            <MemoryRouter>
            <Categorias />
            </MemoryRouter>
        );
        });

        setTimeout(() => {
        const buttonGroups = container.querySelectorAll('.btn-group .dropdown-toggle');
        expect(buttonGroups.length > 0).toBe(true);
        expect(buttonGroups[0].textContent).toContain('Juegos de Mesa');

        

        const links = container.querySelectorAll('a.dropdown-item');
        if (links.length > 0) {
            const catanLink = Array.from(links).find(link => link.textContent === 'Catan');
            expect(catanLink.getAttribute('href')).toBe('/productos/JM001');
        }

        done();
        }, 0);
    });
});
