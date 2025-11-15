import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Carrito from '../components/carrito';


const mockPropsEmpty = {
cartItems: [],
subtotal: 0,
costoEnvio: 0,
totalPagar: 0,
finalizarCompra: vi.fn(),
vaciarCarrito: vi.fn(),
removeItem: vi.fn(),
updateQuantity: vi.fn(),
purchaseMessage: null,
};

const mockPropsFilled = {
...mockPropsEmpty,
cartItems: [{ id: 99, name: 'Producto Testeado', price: 100000, quantity: 2 }],
subtotal: 200000,
costoEnvio: 5000,
totalPagar: 205000,
};

describe('Componente Carrito', () => {

it('debe renderizar el componente con el carrito vacío por defecto', () => {
    render(<Carrito {...mockPropsEmpty} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Tu carrito está vacío/i)).toBeDefined();
    expect(screen.getByText(/Subtotal:/i)).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();

    const finalizarButton = screen.getByRole('button', { name: /Finalizar Compra/i });
    expect(finalizarButton).toBeDisabled();
});

it('debe renderizar el ítem de prueba y los totales correctamente (Estado Lleno)', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/Producto Testeado/i)).toBeDefined();
    expect(screen.getByText('205000')).toBeDefined();

    const finalizarButton = screen.getByRole('button', { name: /Finalizar Compra/i });
    expect(finalizarButton).toBeEnabled();
});

it('debe llamar a la función vaciarCarrito al hacer clic', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    const vaciarButton = screen.getByText(/Vaciar Carrito/i);
    fireEvent.click(vaciarButton);

    expect(mockPropsFilled.vaciarCarrito).toHaveBeenCalled();
});

it('debe llamar a la función finalizarCompra al hacer clic', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    const finalizarButton = screen.getByText(/Finalizar Compra/i);
    fireEvent.click(finalizarButton);

    expect(mockPropsFilled.finalizarCompra).toHaveBeenCalled();
});

it('debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "+"', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 3);
});

it('debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "-"', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);

    expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 1);
});

it('el botón "-" debe estar deshabilitado cuando la cantidad es 1', () => {
    const propsQtyOne = {
    ...mockPropsEmpty,
    cartItems: [{ id: 99, name: 'Producto Testeado', price: 100000, quantity: 1 }],
    };

    render(<Carrito {...propsQtyOne} />, { wrapper: MemoryRouter });

    const minusButton = screen.getByText('-');
    expect(minusButton).toBeDisabled();
});

it('debe llamar a removeItem con el ID correcto al hacer clic en el botón de eliminar ("X")', () => {
    render(<Carrito {...mockPropsFilled} />, { wrapper: MemoryRouter });

    const removeButton = screen.getByText(/remover|eliminar|x/i);
    fireEvent.click(removeButton);

    expect(mockPropsFilled.removeItem).toHaveBeenCalledWith(99);
    });

});
