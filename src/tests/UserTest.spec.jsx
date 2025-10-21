import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTest from "../src/pages/UserTest";

describe("Componente Home", () => {
    it("renderiza el título correctamente", () => {
    render(<UserTest />);
    expect(screen.getByText("Titulo del sitio")).toBeInTheDocument();
});
    it("contiene un párrafo descriptivo", () => {
    render(<UserTest />);
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
});
    it('renderiza el botón "Validar"', () => {
    render(<UserTest />);
    expect(screen.getByRole("button", { name: /validar/i
})).toBeInTheDocument();
    });
        it("muestra mensaje al hacer clic en Validar", () => {
        render(<UserTest />);
        const boton = screen.getByRole("button", { name: /validar/i });
        fireEvent.click(boton);
        expect(screen.getByRole("status")).toHaveTextContent("Validado correctamente");
    });
});