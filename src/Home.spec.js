import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Home from './components/Home';

// Mock para react-router-bootstrap
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

describe('Componente Home', () => {
    it('renderiza Productos Destacados y lista de productos', () => {
        act(() => {
        createRoot(container).render(<Home />);
    });

    const title = container.querySelector('h2');
    expect(title.textContent).toBe('Productos Destacados');

    const cards = container.querySelectorAll('.card');
    expect(cards.length).toBeGreaterThan(0);

    expect(cards[0].textContent).toContain('Catan');
    expect(cards[0].textContent).toContain('$29.990');
    });
});
