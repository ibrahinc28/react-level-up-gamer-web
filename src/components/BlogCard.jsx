import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

function BlogCard({ article }) {
   
    const cardClass = article.type ? article.type : 'blog-card'; 

    return (
        <Card className={cardClass} style={{ width: '100%' }}> 
            
            <Card.Img variant="top" src={article.imageSrc} alt={article.title} /> 
            
            <Card.Body>
                
                {article.date && <Card.Subtitle className="mb-2 text-muted">{article.date}</Card.Subtitle>}
                
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.summary}</Card.Text>
                
                <Button 
                    as={Link} 
                    to={`/blog/${article.id}`} 
                    variant="primary"
                    className="read-more-btn"
                >
                    Leer más
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BlogCard;