import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Productos from './components/Productos';

describe('Componente Productos', () => {

    it('renderiza correctamente el título y los productos', () => {
        render(
        <MemoryRouter>
            <Productos />
        </MemoryRouter>
        );

    // Verifica que el título exista y tenga el texto esperado
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeDefined();
    expect(h1.textContent).toBe('Productos');

    // Verifica que haya tarjetas de productos con la clase 'card'
    const cards = screen.getAllByClass('card'); 
    expect(cards.length).toBeGreaterThan(0);

    // verifica que el contenido contenga clp
    expect(cards[0].textContent).toContain('CLP');
    });

});
