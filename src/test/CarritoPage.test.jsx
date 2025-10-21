import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; 

import Carrito from '../Carrito'; 

const mockPropsEmpty = {
    cartItems: [],
    subtotal: 0,
    costoEnvio: 0,
    totalPagar: 0,
    finalizarCompra: jest.fn(),
    vaciarCarrito: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    purchaseMessage: null,
};

const mockPropsFilled = {
    ...mockPropsEmpty,
    cartItems: [
        { id: 99, name: 'Producto Testeado', price: 100000, quantity: 2 },
    ],
    subtotal: 200000, 
    costoEnvio: 5000,
    totalPagar: 205000,
};


beforeEach(() => {
    jest.clearAllMocks();
});

describe('Componente Carrito (Usando sintaxis Jasmine)', () => {

    it('1. Debe renderizar el componente con el carrito vacío por defecto', () => {
        render(<Carrito {...mockPropsEmpty} />);
        
        expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
        expect(screen.getByText(/Subtotal:/i)).toBeInTheDocument();
        expect(screen.getByText(/0/i)).toBeInTheDocument(); 
        expect(screen.getByRole('button', { name: /Finalizar Compra/i })).toBeDisabled();
    });

    it('2. Debe renderizar el ítem de prueba y los totales correctamente (Estado Lleno)', () => {
        render(<Carrito {...mockPropsFilled} />);
        
        expect(screen.getByText(/Producto Testeado/i)).toBeInTheDocument();
        expect(screen.getByText(/205000/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Finalizar Compra/i })).not.toBeDisabled();
    });
    
    it('3. Debe llamar a la función vaciarCarrito al hacer clic', async () => {
        render(<Carrito {...mockPropsFilled} />);
        const vaciarButton = screen.getByRole('button', { name: /Vaciar Carrito/i });
        await userEvent.click(vaciarButton);
        expect(mockPropsFilled.vaciarCarrito).toHaveBeenCalledTimes(1);
    });

    it('4. Debe llamar a la función finalizarCompra al hacer clic', async () => {
        render(<Carrito {...mockPropsFilled} />);
        const finalizarButton = screen.getByRole('button', { name: /Finalizar Compra/i });
        await userEvent.click(finalizarButton);
        expect(mockPropsFilled.finalizarCompra).toHaveBeenCalledTimes(1);
    });

    it('5. Debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "+"', async () => {
        render(<Carrito {...mockPropsFilled} />);
        const plusButton = screen.getByRole('button', { name: /\+/i }); 
        
        await userEvent.click(plusButton);
        expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 3); 
    });

    it('6. Debe llamar a updateQuantity con la nueva cantidad al hacer clic en el botón "-"', async () => {
        render(<Carrito {...mockPropsFilled} />);
        const minusButton = screen.getByRole('button', { name: /-/i }); 
        
        await userEvent.click(minusButton);

        expect(mockPropsFilled.updateQuantity).toHaveBeenCalledWith(99, 1); 
    });

    it('7. El botón "-" debe estar deshabilitado cuando la cantidad es 1', () => {
        const propsQtyOne = {
             ...mockPropsEmpty,
             cartItems: [{ id: 99, name: 'Producto Testeado', price: 100000, quantity: 1 }],
        };
        render(<Carrito {...propsQtyOne} />);
        
        const minusButton = screen.getByRole('button', { name: /-/i }); 
        
        expect(minusButton).toBeDisabled();
    });

    it('8. Debe llamar a removeItem con el ID correcto al hacer clic en el botón de eliminar ("X")', async () => {
        render(<Carrito {...mockPropsFilled} />);
        
        const removeButton = screen.getByRole('button', { name: /remover|eliminar|x/i });
        
        await userEvent.click(removeButton);
        expect(mockPropsFilled.removeItem).toHaveBeenCalledWith(99);
    });

});