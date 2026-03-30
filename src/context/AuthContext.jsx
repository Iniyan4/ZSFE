// AuthContext.jsx
import { createContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/authApi'
import { tokenStorage, userStorage } from '../utils/storage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(userStorage.get())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      const access = tokenStorage.getAccess()
      if (!access) {
        setLoading(false)
        return
      }

      try {
        const res = await authApi.me()
        const currentUser = res.data || res
        setUser(currentUser)
        userStorage.set(currentUser)
      } catch {
        tokenStorage.clearTokens()
        userStorage.clear()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

    const login = async (payload) => {
        const data = await authApi.login(payload)

        if (data.success) {
            // Use your utility instead of raw localStorage
            tokenStorage.setAccess(data.tokens.access)
            tokenStorage.setRefresh(data.tokens.refresh)

            setUser(data.user)
            userStorage.set(data.user)

            return data
        } else {
            throw new Error(data.message || "Login failed")
        }
    }

  const register = async (payload) => authApi.register(payload)

  const logout = () => {
    tokenStorage.clearTokens()
    userStorage.clear()
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, setUser, login, register, logout, loading, isAuthenticated: !!user }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
