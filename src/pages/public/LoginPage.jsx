// LoginPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout'
import LoginForm from '../../components/forms/LoginForm'
import { useAuth } from '../../hooks/useAuth'
import { getRoleRedirectPath } from '../../utils/roleRedirect'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = async (values) => {
    try {
      const res = await login(values)
      const user = res.user || res.data?.user
      navigate(getRoleRedirectPath(user?.role))
    } catch {
      setError('Login failed. Please check your backend and credentials.')
    }
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md rounded-[32px] bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-600">Login to your ZeroServe account.</p>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <div className="mt-6"><LoginForm onSubmit={handleLogin} /></div>
        <p className="mt-5 text-sm text-slate-600">No account? <Link to="/register" className="font-semibold text-brand-700">Register</Link></p>
      </div>
    </PublicLayout>
  )
}
