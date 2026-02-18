import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const currentPath = window.location.pathname
      if (!currentPath.startsWith('/auth')) {
        localStorage.removeItem('AUTH_TOKEN')
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
