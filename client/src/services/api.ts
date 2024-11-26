import axios from 'axios'
const baseURL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default api
