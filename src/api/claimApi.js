import api from './axios'

export const claimApi = {
    create: async (foodId, payload) => (await api.post(`/claims/create/${foodId}/`, payload)).data,
    listNgoClaims: async () => (await api.get('/claims/my/')).data,
    listFoodClaims: async (foodId) => (await api.get(`/claims/food/${foodId}/`)).data,
    accept: async (claimId) => (await api.post(`/claims/${claimId}/accept/`)).data,
    reject: async (claimId) => (await api.post(`/claims/${claimId}/reject/`)).data,
    verify: async (claimId) => (await api.post(`/claims/${claimId}/verify/`)).data,
    dispute: async (claimId) => (await api.post(`/claims/${claimId}/dispute/`)).data,
}