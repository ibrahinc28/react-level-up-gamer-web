import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function Banner() {
    return (
        <Carousel interval={3000} pause= "hover" controls={true} indicators={true} fade={true} style={{ height: '300px' }}>
        <Carousel.Item interval={3000}>
            <img
            className="d-block w-100"
            src="/images/bannerHaloween.png"
            alt="Banner 1"
            style={{ height: '300px', objectFit: 'cover' }}
            />
            
        </Carousel.Item>
        
        <Carousel.Item interval={3000}>
            <img
            className="d-block w-100"
            src="/images/bannerPlayStation.png"
            alt="Banner 2"
            style={{ height: '300px', objectFit: 'cover' }}
            />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
            <img
            className="d-block w-100"
            src="/images/banner-descuento.png"
            alt="Banner 3"
            style={{ height: '300px', objectFit: 'cover' }}
            />
        </Carousel.Item>
        
        </Carousel>
    );
}

export default Banner;
