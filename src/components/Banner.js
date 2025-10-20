import React from 'react';


function Banner() {
    const bannerStyle = {
        backgroundImage: `url(/images/banner-descuento.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        color: '#39FF14',  // Verde neón del cliente
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Orbitron', sans-serif",
        textShadow: '2px 2px 4px black',
        position: 'relative',
        zIndex: 1,
    };

    return (
        <section style={bannerStyle}></section>
    );
}

export default Banner;
