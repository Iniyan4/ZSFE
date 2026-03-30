import axios from 'axios'
import { tokenStorage } from '../utils/storage'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`  // 🔥 IMPORTANT
    }

    return config
})

export default api