import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BlogPage from '../pages/BlogPage';

describe('BlogPage Component', () => {

  it('debe renderizar la página del blog correctamente', async () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Blog & Noticias Recientes/i)).toBeDefined();
  });

  it('debe mostrar los títulos de las secciones', async () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Noticias y Actualizaciones/i)).toBeDefined();
    expect(screen.getByText(/Novedades y Promociones/i)).toBeDefined();
    expect(screen.getByText(/Artículos Más Vendidos/i)).toBeDefined();
    expect(screen.getByText(/Guías y Tutoriales/i)).toBeDefined();
  });

  it('debe renderizar artículos de cada categoría', async () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/¡Revisa los nuevos y alucinantes lanzamientos en el Nintendo Direct!/i)).toBeDefined();
    expect(screen.getByText(/¡Descuento del 15% en PCs Gamers Armados!/i)).toBeDefined();
    expect(screen.getByText(/AMD Ryzen 9 7950X3D: El rey de los videojuegos/i)).toBeDefined();
    expect(screen.getByText(/Guía completa para armar tu primer PC Gamer/i)).toBeDefined();
  });

  it('debe renderizar todos los botones "Leer más"', async () => {
    const { container } = render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    const readMoreButtons = Array.from(container.querySelectorAll('button')).filter(
      btn => /Leer más/i.test(btn.textContent)
    );
    expect(readMoreButtons.length).toBe(12);
  });

});
