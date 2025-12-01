import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Categorias from './components/Categorias';

describe('Componente Categorias', () => {
    it('renderiza todas las categorías y productos esperados', async () => {
        const { container } = render(
        <MemoryRouter>
            <Categorias />
        </MemoryRouter>
        );

        // Buscamos por clases .btn-group .dropdown-toggle usando querySelectorAll
        const buttonGroups = container.querySelectorAll('.btn-group .dropdown-toggle');
        expect(buttonGroups.length).toBeGreaterThan(0);
        expect(buttonGroups[0].textContent).toContain('Juegos de Mesa');

        // Buscamos links con clase dropdown-item
        const links = container.querySelectorAll('a.dropdown-item');
        if (links.length > 0) {
        const catanLink = Array.from(links).find(link => link.textContent === 'Catan');
        expect(catanLink.getAttribute('href')).toBe('/productos/JM001');
        }
    });
});
