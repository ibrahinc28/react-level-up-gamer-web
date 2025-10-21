import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from '../pages/BlogPage';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('BlogPage Component', () => {

  it('debe renderizar la página del blog correctamente', (done) => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );
    });

    setTimeout(() => {
      expect(container.textContent).toMatch(/Blog & Noticias Recientes/i);
      done();
    }, 0);
  });

  it('debe mostrar los títulos de las secciones', (done) => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );
    });

    setTimeout(() => {
      expect(container.textContent).toMatch(/Noticias y Actualizaciones/i);
      expect(container.textContent).toMatch(/Novedades y Promociones/i);
      expect(container.textContent).toMatch(/Artículos Más Vendidos/i);
      expect(container.textContent).toMatch(/Guías y Tutoriales/i);
      done();
    }, 0);
  });

  it('debe renderizar artículos de cada categoría', (done) => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );
    });

    setTimeout(() => {
      expect(container.textContent).toMatch(/¡Revisa los nuevos y alucinantes lanzamientos en el Nintendo Direct!/i);
      expect(container.textContent).toMatch(/¡Descuento del 15% en PCs Gamers Armados!/i);
      expect(container.textContent).toMatch(/AMD Ryzen 9 7950X3D: El rey de los videojuegos/i);
      expect(container.textContent).toMatch(/Guía completa para armar tu primer PC Gamer/i);
      done();
    }, 0);
  });

  it('debe renderizar todos los botones "Leer más"', (done) => {
    act(() => {
      createRoot(container).render(
        <MemoryRouter>
          <BlogPage />
        </MemoryRouter>
      );
    });

    setTimeout(() => {
      const readMoreButtons = Array.from(container.querySelectorAll('button')).filter(
        btn => /Leer más/i.test(btn.textContent)
      );
      expect(readMoreButtons.length).toBe(12);
      done();
    }, 0);
  });
});
