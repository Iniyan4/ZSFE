import api from './axios'

export const reliabilityApi = {
    performAction: async (userId, action) => (await api.post(`/reliability/users/${userId}/action/`, { action })).data,
};