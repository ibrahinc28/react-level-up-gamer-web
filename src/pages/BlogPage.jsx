import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [role] = useState("ADMIN");
    const token = "TOKEN_DE_EJEMPLO_12345";

    return (
        <UserContext.Provider value={{ role, token }}>
            {children}
        </UserContext.Provider>
    );
};

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

const BlogCard = ({ article, onDelete, onEdit }) => {
    const { role } = useContext(UserContext);

    const typeColors = useMemo(() => {
        switch (article.type) {
            case 'promotion': return 'bg-indigo-600';
            case 'bestseller': return 'bg-amber-500';
            case 'guide': return 'bg-emerald-500';
            case 'news':
            default: return 'bg-sky-500';
        }
    }, [article.type]);

    const placeholderUrl = useMemo(() => {
        const text = article.title.split(' ').slice(0, 3).join('+');
        return `https://placehold.co/600x400/222222/FFFFFF?text=${text}`;
    }, [article.title]);

    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-gray-800 border border-gray-700 w-full">
            
            <div className="relative overflow-hidden">
                <img 
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderUrl;
                    }}
                />
                <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-full ${typeColors}`}>
                    {article.type}
                </span>
            </div>

            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-100 mb-2 leading-snug hover:text-cyan-400 transition cursor-pointer">{article.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-3">{article.summary}</p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">
                    <span className="font-semibold text-cyan-400">Leer más...</span>
                    <span>{article.date}</span>
                </div>

                {role === "ADMIN" && (
                    <div className="flex gap-3 mt-4">
                        <button 
                            onClick={() => onEdit(article)} 
                            className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                        >
                            Editar
                        </button>

                        <button 
                            onClick={() => onDelete(article.id)} 
                            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ContainerProxy = ({ children, className }) => (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
    </div>
);

const RowProxy = ({ children, xs, md, lg, className, ...rest }) => (
    <div 
        className={`grid 
            ${xs ? `grid-cols-${xs}` : 'grid-cols-1'} 
            ${md ? `md:grid-cols-${md}` : 'md:grid-cols-2'} 
            ${lg ? `lg:grid-cols-${lg}` : 'lg:grid-cols-3'} 
            gap-6 ${className}`}
        {...rest}
    >
        {children}
    </div>
);

const ColProxy = ({ children, className }) => (
    <div className={`flex ${className}`}>
        {children}
    </div>
);

const getArticlesByCategory = (category, articles) => 
    articles.filter(a => a.type === category);

const BlogGridSection = ({ title, articles, onDelete, onEdit }) => {
    if (articles.length === 0) return null;

    return (
        <section className="my-10">
            <h2 className="text-3xl font-extrabold text-white mb-6 border-b-2 border-cyan-500 pb-2">{title}</h2>

            <RowProxy xs={1} md={2} lg={3} className="g-4">
                {articles.map(article => (
                    <ColProxy key={article.id} className="d-flex">
                        <BlogCard 
                            article={article} 
                            onDelete={onDelete}
                            onEdit={onEdit}
                        /> 
                    </ColProxy>
                ))}
            </RowProxy>
        </section>
    );
};

function BlogPage() {
    const [articlesFromBackend, setArticlesFromBackend] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { role, token } = useContext(UserContext);

    const [editingArticle, setEditingArticle] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/blog");
                if (!res.ok) throw new Error("Error fetching blog articles");

                const data = await res.json();
                setArticlesFromBackend(data);

            } catch (error) {
                console.error("Error al cargar, usando datos locales:", error);
                setArticlesFromBackend(blogArticles);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleCreate = async () => {
        if (!newTitle.trim()) return;

        try {
            const res = await fetch("http://localhost:8080/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newTitle,
                    summary: "Nuevo artículo",
                    date: "1 Ene 2026",
                    type: "news",
                    imageSrc: ""
                })
            });

            if (!res.ok) throw new Error("Error en POST");

            const created = await res.json();
            setArticlesFromBackend(prev => [...prev, created]);
            setNewTitle("");

        } catch (error) {
            console.error("Error al crear:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/blog/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Error DELETE");

            setArticlesFromBackend(prev => prev.filter(a => a.id !== id));

        } catch (error) {
            console.error("Error eliminando:", error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/blog/${editingArticle.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...editingArticle,
                    title: editedTitle
                })
            });

            if (!res.ok) throw new Error("Error PUT");

            const updated = await res.json();

            setArticlesFromBackend(prev => 
                prev.map(a => a.id === updated.id ? updated : a)
            );

            setEditingArticle(null);

        } catch (error) {
            console.error("Error editando:", error);
        }
    };

    const articlesWithImages = articlesFromBackend.map(article => {
        const localArticle = blogArticles.find(a => a.id === article.id);
        return {
            ...article,
            imageSrc: localArticle?.imageSrc || 'https://placehold.co/600x400/374151/FFFFFF?text=Default'
        };
    });

    const news = getArticlesByCategory('news', articlesWithImages);
    const promotions = getArticlesByCategory('promotion', articlesWithImages);
    const bestsellers = getArticlesByCategory('bestseller', articlesWithImages);
    const guides = getArticlesByCategory('guide', articlesWithImages);

    if (isLoading && articlesFromBackend.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <p className="text-xl text-cyan-400">Cargando artículos...</p>
            </div>
        );
    }

    return (
        <ContainerProxy className="blog-page mt-4 min-h-screen bg-gray-900 font-inter text-gray-200">

            <h1 className="text-5xl font-extrabold text-center text-cyan-400 mb-8 pt-4">
                Blog & Noticias Recientes
            </h1>

            {role === "ADMIN" && (
                <div className="mb-10 p-5 bg-gray-800 border border-gray-700 rounded-xl">
                    <h3 className="text-xl mb-2 text-yellow-400">Crear nuevo artículo</h3>

                    <div className="flex gap-3">
                        <input 
                            type="text"
                            placeholder="Título..."
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            className="p-2 rounded bg-gray-700 border border-gray-600 text-white flex-grow"
                        />

                        <button 
                            onClick={handleCreate}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                        >
                            Crear
                        </button>
                    </div>
                </div>
            )}

            <BlogGridSection title="Noticias y Actualizaciones" articles={news} onDelete={handleDelete} onEdit={setEditingArticle} />
            <BlogGridSection title="Novedades y Promociones" articles={promotions} onDelete={handleDelete} onEdit={setEditingArticle} />
            <BlogGridSection title="Artículos Más Vendidos" articles={bestsellers} onDelete={handleDelete} onEdit={setEditingArticle} />
            <BlogGridSection title="Guías y Tutoriales" articles={guides} onDelete={handleDelete} onEdit={setEditingArticle} />

            {editingArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-xl min-w-[300px] border border-gray-700">
                        <h3 className="text-xl text-yellow-400 mb-3">Editar artículo</h3>

                        <input 
                            type="text"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                            placeholder="Nuevo título"
                            className="p-2 w-full bg-gray-700 border border-gray-600 text-white rounded"
                        />

                        <div className="flex justify-end mt-4 gap-3">
                            <button 
                                onClick={() => setEditingArticle(null)}
                                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                            >
                                Cancelar
                            </button>

                            <button 
                                onClick={handleSaveEdit}
                                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ContainerProxy>
    );
}

const App = () => (
    <UserProvider>
        <BlogPage />
    </UserProvider>
);

export default App;
