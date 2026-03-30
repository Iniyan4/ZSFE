
import api from './axios'

export const foodApi = {
    create: async (payload) => (await api.post('/food/create/', payload)).data, // Updated to /create/
    list: async (params = {}) => (await api.get('/food/', { params })).data,
    detail: async (id) => (await api.get(`/food/${id}/`)).data,
}
