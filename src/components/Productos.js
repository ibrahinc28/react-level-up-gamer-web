// src/components/Productos.js
function Productos() {
const productos = [
    { id: 1, nombre: "Producto A", precio: 100 },
    { id: 2, nombre: "Producto B", precio: 200 },
    { id: 3, nombre: "Producto C", precio: 300 },
];

return (
    <div>
        <h1>Productos</h1>
        <ul>
            {productos.map(producto => (
            <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            </li>
        ))}
        </ul>
    </div>
    );
}

export default Productos;
