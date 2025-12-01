import { useEffect, useState } from "react"
import { getUser, deleteUser } from "../apiuser"

export default function UserTable() {
  const [pacientes, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debug, setDebug] = useState(null)

  const cargar = async () => {
    try {
      setLoading(true)
      setError(null)
      setDebug(null)
      const data = await getUser()
      console.log("Usuarios (debug):", data)
      setDebug(data)
      setUser(data)
    } catch (e) {
      console.error(e)
      setError(e?.message || "Error al cargar usuarios")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return
    await deleteUser(id)
    cargar()
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p style={{ color:"red" }}>⚠ {error}</p>

  if (!pacientes.length) {
    return (
      <div>
        <p>No hay usuarios para mostrar.</p>
        {debug && <pre style={{whiteSpace:"pre-wrap"}}>{JSON.stringify(debug, null, 2)}</pre>}
        <button onClick={cargar}>Reintentar</button>
      </div>
    )
  }

  // Ajusta los nombres de campos según tu entidad (p.ej., idPaciente en vez de id)
  return (
    <table border="1" cellPadding="8" style={{width:"100%", borderCollapse:"collapse"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Segundo Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Contraseña</th>
          <th>Correo</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map(p => (
          <tr key={p.id ?? p.idUser}>
            <td>{p.id ?? p.idUser}</td>
            <td>{p.nombre}</td>
            <td>{p.snombre}</td>
            <td>{p.apellidopat}</td>
            <td>{p.apellidomat}</td>
            <td>{p.contrasena}</td>
            <td>{p.correo}</td>
            <td>
              <button onClick={() => onDelete(p.id ?? p.idUser)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}