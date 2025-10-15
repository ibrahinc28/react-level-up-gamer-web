import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const blogArticles = [
    { 
        id: 1, 
        title: "¡Revisa los nuevos y alucinantes lanzamientos en el Nintendo Direct!", 
        date: "21 Jun, 2024", 
        summary: "Últimos esperados e inesperados remakes y...", 
        imageSrc: "https://placehold.co/400x200/505050/FFFFFF?text=NEWS+1", 
        type: "news" 
    },
    { 
        id: 4, 
        title: "¡Descuento del 15% en PCs Gamers Armados!", 
        date: "", 
        summary: "Aprovecha esta oportunidad para potenciar...", 
        imageSrc: "https://placehold.co/400x200/FF0000/FFFFFF?text=PROMO+15%25", 
        type: "promotion" 
    },
    { 
        id: 5, 
        title: "AMD Ryzen 9 7950X3D: El rey de los videojuegos", 
        date: "17 Jun, 2024", 
        summary: "Conoce por qué este procesador es el más buscado...", 
        imageSrc: "https://placehold.co/400x200/007bff/FFFFFF?text=BESTSELLER", 
        type: "bestseller" 
    },
    { 
        id: 6, 
        title: "¿PC o consola? Comparación para el gamer moderno", 
        date: "12 Jun, 2024", 
        summary: "Un debate eterno: analizamos pros y contras para ayudarte a elegir tu plataforma ideal...", 
        imageSrc: "https://placehold.co/400x200/000000/FFFFFF?text=GUIA+PC", 
        type: "guide" 
    },
];

const getArticlesByCategory = (category) => 
    blogArticles.filter(a => a.type === category);

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
    const recentArticles = getArticlesByCategory('news');
    const promotions = getArticlesByCategory('promotion');
    const bestsellers = getArticlesByCategory('bestseller'); 
    const guides = getArticlesByCategory('guide');

    return (
        <Container className="blog-page mt-4">
            <h1 className="mb-4">Blog & Noticias Recientes</h1>
            
            <BlogGridSection title="Noticias y Actualizaciones" articles={recentArticles} />
            <BlogGridSection title="Novedades y Promociones" articles={promotions} />
            <BlogGridSection title="Artículos Más Vendidos" articles={bestsellers} />
            <BlogGridSection title="Guías y Tutoriales" articles={guides} />
        </Container>
    );
}

export default BlogPage;