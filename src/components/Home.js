import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Banner from './Banner';
import Categorias from './Categorias';

const productos = [
    {
        imagen: "/images/catan.png",
        codigo: "JM001",
        categoria: "Juegos de Mesa",
        nombre: "Catan",
        descripcion: "Clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
        precio: 29990,
    },
    {
        imagen: "/images/controlxbox.png",
        codigo: "AC001",
        categoria: "Accesorios",
        nombre: "Controlador Inalámbrico Xbox Series X",
        descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
        precio: 59990,
    },
    {
        imagen: "/images/playstation5.png",
        codigo: "CO001",
        categoria: "Consolas",
        nombre: "PlayStation 5",
        descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        precio: 549990,
    },
    {
        imagen: "/images/audifonosHyper.png",
        codigo: "AC002",
        categoria: "Accesorios",
        nombre: "Auriculares Gamer HyperX Cloud II",
        descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
        precio: 79990,
    },
    ];

    const Home = () => {
    return (
        <div>
        {/* Banner en la parte superior */}
        <Banner />

        {/* Sección de categorías */}
        <Container className="my-5">
            <Categorias />
        </Container>

        {/* Productos destacados */}
        <Container className="mt-4">
            <h2 className="mb-4 text-center" style={{ color: '#39FF14', fontFamily: "'Orbitron', sans-serif" }}>
            Productos Destacados
            </h2>
            <Row>
            {productos.map((producto) => (
                <Col key={producto.codigo} sm={12} md={6} lg={3} className="mb-4">
                <Card
                    bg="dark"
                    text="light"
                    style={{
                    maxWidth: '300px',
                    margin: '0 auto',
                    borderColor: '#1E90FF',
                    borderWidth: '2px',
                    }}
                >
                    <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{
                        height: '180px',
                        objectFit: 'contain',
                        backgroundColor: '#111',
                    }}
                    />
                    <Card.Body>
                    <Card.Title style={{ color: '#1E90FF' }}>{producto.nombre}</Card.Title>
                    <Card.Text style={{ fontSize: '0.9rem', color: '#D3D3D3' }}>{producto.descripcion}</Card.Text>
                    <Card.Text style={{ fontWeight: 'bold', color: '#39FF14' }}>
                        ${producto.precio.toLocaleString('es-CL')}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button variant="success">Comprar</Button>
                        <Button variant="primary">Agregar</Button>
                    </div>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
        </div>
    );
};

export default Home;


