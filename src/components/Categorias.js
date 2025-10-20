import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Mapa de productos con su código para crear URL dinámica
const productosCodigo = {
    'Catan': 'JM001',
    'Carcassonne': 'JM002',
    'Controlador Inalámbrico Xbox Series X': 'AC001',
    'Auriculares Gamer HyperX Cloud II': 'AC002',
    'PlayStation 5': 'CO001',
    'PC Gamer ASUS ROG Strix': 'CG001',
    'Silla Gamer Secretlab Titan': 'SG001',
    'Mouse Gamer Logitech G502 HERO': 'MS001',
    'Mousepad Razer Goliathus Extended Chroma': 'MP001',
    };

const Categorias = () => {
    const categoriasConProductos = {
        'Juegos de Mesa': ['Catan', 'Carcassonne'],
        'Accesorios': ['Controlador Inalámbrico Xbox Series X', 'Auriculares Gamer HyperX Cloud II'],
        'Consolas': ['PlayStation 5'],
        'Computadores': ['PC Gamer ASUS ROG Strix'],
        'Sillas Gamers': ['Silla Gamer Secretlab Titan'],
        'Mouse': ['Mouse Gamer Logitech G502 HERO', 'Mousepad Razer Goliathus Extended Chroma'],
    };

    return (
        <>
        {Object.entries(categoriasConProductos).map(([categoria, productos]) => (
            <DropdownButton
            as={ButtonGroup}
            key={categoria}
            id={`dropdown-variants-${categoria}`}
            variant={'primary' /* categoria.toLowerCase() */}
            title={categoria}
            >
            {productos.map((producto, index) => {
                const codigo = productosCodigo[producto];
                return (
                <Dropdown.Item
                    as={Link}
                    to={`/productos/${codigo}`}
                    key={index}
                >
                    {producto}
                </Dropdown.Item>
                );
            })}
            </DropdownButton>
        ))}
        </>
    );
};

export default Categorias;
