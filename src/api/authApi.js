import api from './axios'

export const authApi = {
    login: async (payload) => {
        const res = await api.post('/auth/login/', {
            username: payload.email,  // 🔥 IMPORTANT CHANGE
            password: payload.password
        })
        return res.data
    },

    register: async (payload) => {
        const roleMap = {
            donor: "donor",
            ngo: "ngo",
            delivery_partner: "delivery",   // 🔥 FIX
            admin: "admin"
        }

        const res = await api.post('/auth/register/', {
            username: payload.email,
            email: payload.email,
            password: payload.password,
            role: roleMap[payload.role]
        })

        return res.data
    },

    me: async () => {
        const res = await api.get('/auth/me/')
        return res.data
    }
}