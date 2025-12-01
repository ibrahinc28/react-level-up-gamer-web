import axios from "axios"

const api = axios.create({
  baseURL: "http://44.223.134.187:8080/api/", // gracias al proxy de Vite
})

//export const getPacientes = () => api.get("/paciente")
//export const getPaciente = (id) => api.get(`/paciente/${id}`)
//export const createPaciente = (data) => api.post("/paciente", data)
//export const updatePaciente = (id, data) => api.put(`/paciente/${id}`, data)
//export const deletePaciente = (id) => api.delete(`/paciente/${id}`)

export const getUser = async () => {
  const res = await api.get("/usuarios")
  // Soporta tanto array plano como paginado tipo Spring (content)
  const data = Array.isArray(res.data) ? res.data : (res.data?.content ?? [])
  return data
}

export const createUser = (payload) => api.post("/usuarios", payload)
export const deleteUser = (id) => api.delete(`/usuarios/${id}`)
export const updateUser = (id, data) => api.put(`/usuarios/${id}`, data)