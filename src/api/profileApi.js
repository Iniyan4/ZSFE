// profileApi.js
import api from './axios'

export const profileApi = {
  update: async (payload) => (await api.put('/profile/', payload)).data,
  me: async () => (await api.get('/profile/me/')).data,
}
