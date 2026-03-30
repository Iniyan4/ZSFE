// adminApi.js
import api from './axios'

export const adminApi = {
  flaggedUsers: async () => (await api.get('/admin/flagged-users/')).data,
  flaggedListings: async () => (await api.get('/admin/flagged-listings/')).data,
}
