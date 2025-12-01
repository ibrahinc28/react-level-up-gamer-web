import { useState } from "react"
import { createUser } from "../apiuser"

const initial = { nombre: "", snombre: "", apellidopat: "", apellidomat: "", contrasena: "", correo: "" }

export default function UserCreate({ onCreated }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError(null)
      await createUser(form)
      setForm(initial)
      onCreated?.()
    } catch (e) {
      console.error(e)
      setError("Error al guardar. Revise los datos e intente de nuevo.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{display:"grid", gap:8, maxWidth:420}}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
      <input name="snombre" placeholder="Segundo Nombre (opcional)" value={form.snombre} onChange={onChange} />
      <input name="apellidopat" placeholder="Apellido Paterno" value={form.apellidopat} onChange={onChange} required />
      <input name="apellidomat" placeholder="Apellido Materno" value={form.apellidomat} onChange={onChange} required />
      <input name="contrasena" placeholder="Contraseña" value={form.contrasena} onChange={onChange} required />
      <input name="correo" placeholder="Correo" value={form.correo} onChange={onChange} required />
      {error && <p style={{color:"red"}}>{error}</p>}
      <button disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
    </form>
  )
}