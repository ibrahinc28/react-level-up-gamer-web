import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import articulo1 from '../images/articulo1.png';
import articulo2 from '../images/articulo2.png';
import consola from '../images/consola-pc.png';
import teclados from '../images/teclados.jpg';
import intel from '../images/intel-amd.jpg';
import ps5 from '../images/ps5-ssd.jpg';
import prom from '../images/promo-pc.jpg';
import promo from '../images/promo-perifericos.png';
import best from '../images/bestseller-cpu.png';
import bestseller from '../images/bestseller-gpu.jpg';
import guia from '../images/guia-armado.png';
import guiaarm from '../images/guia-cooling.jpg';

const blogArticles = [
    { id: 1, title: "¡Revisa los nuevos y alucinantes lanzamientos en el Nintendo Direct!", date: "21 Oct, 2025", summary: "Últimos esperados e inesperados remakes y novedades que Nintendo presentó.", imageSrc: articulo1, type: "news" },
    { id: 2, title: "Cuando una pantalla no es suficiente, los proyectores son la solución", date: "14 Oct, 2025", summary: "Siempre se han usado las grandes pantallas, pero analizamos los pros de los proyectores.", imageSrc: articulo2, type: "news" },
    { id: 3, title: "¿PC o consola? Comparación para el gamer moderno", date: "11 Agost, 2025", summary: "Un debate eterno: analizamos pros y contras para ayudarte a elegir tu plataforma ideal.", imageSrc: consola, type: "news" },
    { id: 7, title: "Diferencias entre teclados mecánicos y de membrana", date: "13 Agost, 2025", summary: "Descubre el tipo de teclado que mejor se adapta a tu estilo de juego y comodidad.", imageSrc: teclados, type: "news" },
    { id: 8, title: "Diferencias de rendimiento entre Ryzen y Core i9", date: "15 Oct, 2025", summary: "Una mirada a la última generación de CPUs para ver cuál te ofrece el mejor rendimiento.", imageSrc: intel, type: "news" },
    { id: 9, title: "Comparación de memorias SSD NVMe Gen 4 vs Gen 5", date: "21 Jun, 2025", summary: "Mejora la velocidad de carga de tus juegos y programas con las últimas SSDs.", imageSrc: ps5, type: "news" },
    { id: 4, title: "¡Descuento del 15% en PCs Gamers Armados!", date: "13 Sept, 2025", summary: "Aprovecha esta oportunidad para potenciar tu experiencia de juego con PCs listos para usar.", imageSrc: prom, type: "promotion" },
    { id: 10, title: "Lanzamiento: Nuevo Teclado Mecánico RGB", date: "2 Sept, 2025", summary: "Conoce nuestro nuevo teclado con switches y personalización RGB de alto nivel.", imageSrc: promo, type: "promotion" },
    { id: 5, title: "AMD Ryzen 9 7950X3D: El rey de los videojuegos", date: "17 Sept, 2025", summary: "Conoce por qué este procesador es el más buscado por los gamers de alto rendimiento.", imageSrc: best, type: "bestseller" },
    { id: 11, title: "NVIDIA RTX 4070 Ti: Calidad-precio insuperable", date: "20 Oct, 2025", summary: "Una tarjeta gráfica que puedes usar en cualquier tipo de juego, rendimiento garantizado.", imageSrc: bestseller, type: "bestseller" },
    { id: 6, title: "Guía completa para armar tu primer PC Gamer", date: "10 Jul, 2025", summary: "Paso a paso, te enseñamos a elegir los componentes y ensamblar tu máquina de ensueño.", imageSrc: guia, type: "guide" },
    { id: 12, title: "Todo sobre la refrigeración líquida cEDE para tu PC", date: "30 Jun, 2025", summary: "Ventajas, desventajas y cómo instalarla correctamente para mantener baja la temperatura.", imageSrc: guiaarm, type: "guide" },
];

const getArticlesByCategory = (category, articles) => 
    articles.filter(a => a.type === category);

const BlogGridSection = ({ title, articles }) => {
    if (articles.length === 0) return null;
    return (
        <section className="my-5">
            <h2 className="section-title mb-4">{title}</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {articles.map(article => (
                    <Col key={article.id} className="d-flex">
                        <BlogCard article={article} />
                    </Col>
                ))}
            </Row>
        </section>
    );
};

function BlogPage() {
    const [articlesFromBackend, setArticlesFromBackend] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/blog');
                if (!res.ok) throw new Error('Error fetching blog articles');
                const data = await res.json();
                setArticlesFromBackend(data);
            } catch (error) {
                console.error('Error fetching blog articles:', error);
            }
        };
        fetchArticles();
    }, []);

    const articlesWithImages = articlesFromBackend.map(article => {
        const localArticle = blogArticles.find(a => a.id === article.id);
        return {
            ...article,
            imageSrc: localArticle?.imageSrc || 'ruta/por/defecto.jpg'
        };
    });

    const news = getArticlesByCategory('news', articlesWithImages);
    const promotions = getArticlesByCategory('promotion', articlesWithImages);
    const bestsellers = getArticlesByCategory('bestseller', articlesWithImages);
    const guides = getArticlesByCategory('guide', articlesWithImages);

    return (
        <Container className="blog-page mt-4"> 
            <h1>Blog & Noticias Recientes</h1>
            <BlogGridSection title="Noticias y Actualizaciones" articles={news} />
            <BlogGridSection title="Novedades y Promociones" articles={promotions} />
            <BlogGridSection title="Artículos Más Vendidos" articles={bestsellers} />
            <BlogGridSection title="Guías y Tutoriales" articles={guides} />
        </Container>
    );
}

export default BlogPage;
