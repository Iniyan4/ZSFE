import api from './axios'

export const aiApi = {
    // Fetch AI insights for all users or flagged users
    getInsights: async () => (await api.get('/ai_support/insights/')).data,
}