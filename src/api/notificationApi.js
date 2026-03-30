// notificationApi.js
import api from './axios'

export const notificationApi = {
  list: async () => (await api.get('/notifications/')).data,
  read: async (id) => (await api.post(`/notifications/${id}/read/`)).data,
}
