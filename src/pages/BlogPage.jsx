import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import { recentArticles, promotions, bestsellers, guides } from '../data/blogArticles'; // Importa los datos

const BlogGridSection = ({ title, articles }) => (
    <section className="my-5">
        <h2 className="section-title mb-4">{title}</h2>
        <Row xs={1} md={2} lg={3} className="g-4"> 
            {articles.map(article => (
                <Col key={article.id}>
                    <BlogCard article={article} />
                </Col>
            ))}
        </Row>
    </section>
);

function BlogPage() {
    return (
        <Container className="blog-page mt-4">
            <h1>Blog & Noticias Recientes</h1>
            
            <BlogGridSection title="Artículos Recientes" articles={recentArticles} />

            <BlogGridSection title="Novedades y Promociones" articles={promotions} />
            
            <BlogGridSection title="Artículos Más Vendidos" articles={bestsellers} />
            
            <BlogGridSection title="Guías y Tutoriales" articles={guides} />
            
        </Container>
    );
}

export default BlogPage;