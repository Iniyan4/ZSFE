import api from './axios'

export const analyticsApi = {
    donor: async () => (await api.get('/analytics/donor/')).data,
    ngo: async () => (await api.get('/analytics/ngo/')).data,
    delivery: async () => (await api.get('/analytics/delivery/')).data,
    admin: async () => (await api.get('/analytics/admin/')).data,
}