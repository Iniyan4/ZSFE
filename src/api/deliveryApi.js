import api from './axios'

export const deliveryApi = {
    create: async (claimId) => (await api.post(`/delivery/create/${claimId}/`)).data,
    accept: async (taskId) => (await api.post(`/delivery/${taskId}/accept/`)).data, // Delivery partner accepts
    myTasks: async () => (await api.get('/delivery/my/')).data,
    detail: async (id) => (await api.get(`/delivery/${id}/`)).data,
    updateStatus: async (id, payload) => (await api.post(`/delivery/${id}/status/`, payload)).data,
    reject: async (taskId) => (await api.post(`/delivery/${taskId}/reject/`)).data,
}