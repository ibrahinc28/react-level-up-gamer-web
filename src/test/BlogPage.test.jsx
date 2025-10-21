import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BlogPage from './BlogPage';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('BlogPage Component', () => {

  it('debe renderizar la página del blog correctamente', () => {
    renderWithRouter(<BlogPage />);
    expect(screen.getByText(/Blog & Noticias Recientes/i)).toBeInTheDocument();

  });

  it('debe mostrar los títulos de las secciones', () => {
    renderWithRouter(<BlogPage />);
    expect(screen.getByText(/Noticias y Actualizaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Novedades y Promociones/i)).toBeInTheDocument();
    expect(screen.getByText(/Artículos Más Vendidos/i)).toBeInTheDocument();
    expect(screen.getByText(/Guías y Tutoriales/i)).toBeInTheDocument();

  });

  it('debe renderizar artículos de cada categoría', () => {
    renderWithRouter(<BlogPage />);
    expect(screen.getByText(/¡Revisa los nuevos y alucinantes lanzamientos en el Nintendo Direct!/i)).toBeInTheDocument();
    expect(screen.getByText(/¡Descuento del 15% en PCs Gamers Armados!/i)).toBeInTheDocument();
    expect(screen.getByText(/AMD Ryzen 9 7950X3D: El rey de los videojuegos/i)).toBeInTheDocument();
    expect(screen.getByText(/Guía completa para armar tu primer PC Gamer/i)).toBeInTheDocument();

  });

  it('debe renderizar todos los botones "Leer más"', async () => {
    renderWithRouter(<BlogPage />);
    const readMoreButtons = await screen.findAllByText(/Leer más/i);
    expect(readMoreButtons).toHaveLength(12);
  });
});