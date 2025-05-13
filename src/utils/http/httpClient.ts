import axios from 'axios'

const VITE_REQRES_API_KEY = import.meta.env.VITE_REQRES_API_KEY

const httpClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': VITE_REQRES_API_KEY,
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

export default httpClient
