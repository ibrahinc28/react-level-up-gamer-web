import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import Carrito from '../components/carrito';

const mockPropsEmpty = {
    cartItems: [],
    subtotal: 0,
    costoEnvio: 0,
    totalPagar: 0,
    finalizarCompra: jasmine.createSpy('finalizarCompra'),
    vaciarCarrito: jasmine.createSpy('vaciarCarrito'),
    removeItem: jasmine.createSpy('removeItem'),
    updateQuantity: jasmine.createSpy('updateQuantity'),
    purchaseMessage: null,
    };

    const mockPropsFilled = {
    ...mockPropsEmpty,
    cartItems: [{ id: 99, name: 'Producto Testeado', price: 100000, quantity: 2 }],
    subtotal: 200000,
    costoEnvio: 5000,
    totalPagar: 205000,
    };

    let container = null;

    beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    });

    afterEach(() => {
    document.body.removeChild(container);
    container = null;
    });

    describe('Componente Carrito', () => {

    it('debe renderizar el componente con el carrito vacío por defecto', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsEmpty} />);
        });

        setTimeout(() => {
        expect(container.textContent).toMatch(/Tu carrito está vacío/i);
        expect(container.textContent).toMatch(/Subtotal:/i);
        expect(container.textContent).toMatch(/0/i);

        const button = container.querySelector('button[aria-label="Finalizar Compra"], button:contains("Finalizar Compra")'); 
        expect(button.disabled).toBe(true);

        done();
        }, 0);
    });

    it('debe renderizar el ítem de prueba y los totales correctamente (Estado Lleno)', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        expect(container.textContent).toMatch(/Producto Testeado/i);
        expect(container.textContent).toMatch(/205000/i);

        const button = container.querySelector('button[aria-label="Finalizar Compra"], button:contains("Finalizar Compra")');
        expect(button.disabled).toBe(false);

        done();
        }, 0);
    });

    it('debe llamar a la función vaciarCarrito al hacer clic', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        const vaciarButton = Array.from(container.querySelectorAll('button')).find(btn => /Vaciar Carrito/i.test(btn.textContent));
        vaciarButton.click();
        expect(mockPropsFilled.vaciarCarrito).toHaveBeenCalled();
        done();
        }, 0);
    });

    it('debe llamar a la función finalizarCompra al hacer clic', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        const finalizarButton = Array.from(container.querySelectorAll('button')).find(btn => /Finalizar Compra/i.test(btn.textContent));
        finalizarButton.click();
        expect(mockPropsFilled.finalizarCompra).toHaveBeenCalled();
        done();
        }, 0);
    });

    it('debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "+"', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        const plusButton = Array.from(container.querySelectorAll('button')).find(btn => /\+/.test(btn.textContent));
        plusButton.click();
        expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 3);
        done();
        }, 0);
    });

    it('debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "-"', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        const minusButton = Array.from(container.querySelectorAll('button')).find(btn => /^-/.test(btn.textContent));
        minusButton.click();
        expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 1);
        done();
        }, 0);
    });

    it('el botón "-" debe estar deshabilitado cuando la cantidad es 1', (done) => {
        const propsQtyOne = {
        ...mockPropsEmpty,
        cartItems: [{ id: 99, name: 'Producto Testeado', price: 100000, quantity: 1 }],
        };

        act(() => {
        createRoot(container).render(<Carrito {...propsQtyOne} />);
        });

        setTimeout(() => {
        const minusButton = Array.from(container.querySelectorAll('button')).find(btn => /^-/.test(btn.textContent));
        expect(minusButton.disabled).toBe(true);
        done();
        }, 0);
    });

    it('debe llamar a removeItem con el ID correcto al hacer clic en el botón de eliminar ("X")', (done) => {
        act(() => {
        createRoot(container).render(<Carrito {...mockPropsFilled} />);
        });

        setTimeout(() => {
        const removeButton = Array.from(container.querySelectorAll('button')).find(btn => /remover|eliminar|x/i.test(btn.textContent));
        removeButton.click();
        expect(mockPropsFilled.removeItem).toHaveBeenCalledWith(99);
        done();
        }, 0);
    });

});
