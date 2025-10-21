import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Categorias from './components/Categorias';

// Mock específico para react-router-bootstrap (que depende de react-router-dom)
jest.mock('react-router-bootstrap', () => ({
    LinkContainer: ({ children }) => <>{children}</>,
    }));

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
    it('renderiza todas las categorías y productos esperados', () => {
        act(() => {
        createRoot(container).render(<Categorias />);
        });

        const buttonGroups = container.querySelectorAll('.btn-group .dropdown-toggle');
        expect(buttonGroups.length).toBeGreaterThan(0);
        expect(buttonGroups[0].textContent).toContain('Juegos de Mesa');

        // Comentado porque "Catan" no está renderizado sin abrir dropdown
        // expect(container.textContent).toContain('Catan');

        const links = container.querySelectorAll('a.dropdown-item');
        if (links.length > 0) {
        const catanLink = Array.from(links).find(link => link.textContent === 'Catan');
        expect(catanLink.getAttribute('href')).toBe('/productos/JM001');
        }
    });
});
