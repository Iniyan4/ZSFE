// storage.js
const ACCESS_KEY = 'zeroserve_access_token'
const REFRESH_KEY = 'zeroserve_refresh_token'
const USER_KEY = 'zeroserve_user'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  setAccess: (token) => localStorage.setItem(ACCESS_KEY, token),
  setRefresh: (token) => localStorage.setItem(REFRESH_KEY, token),
  clearTokens: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

export const userStorage = {
  get: () => {
    const value = localStorage.getItem(USER_KEY)
    return value ? JSON.parse(value) : null
  },
  set: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  clear: () => localStorage.removeItem(USER_KEY),
}
