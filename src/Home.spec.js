import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Home from './components/Home';

describe('Componente Home', () => {
    it('renderiza Productos Destacados y lista de productos', async () => {
    const { container } = render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
    );

    // Esperar que el título exista
    const title = await screen.findByRole('heading', { level: 2, name: 'Productos Destacados' });
    expect(title).toBeDefined();

    // Seleccionar todas las tarjetas (clase .card) usando container
    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBeGreaterThan(0);

    // Verificar contenido esperado en la primera tarjeta
    expect(cards[0].textContent).toContain('Catan');
    expect(cards[0].textContent).toContain('$29.990');
    });
});
