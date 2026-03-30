// RegisterPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout'
import RegisterForm from '../../components/forms/RegisterForm'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (values) => {
    try {
      await register(values)
      setMessage('Registration successful. Please login.')
      setTimeout(() => navigate('/login'), 1000)
    } catch {
      setError('Registration failed. Please check backend validation.')
    }
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-xl rounded-[32px] bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-slate-600">Join as donor, NGO, or delivery partner.</p>
        {message ? <p className="mt-4 text-sm text-green-700">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        <div className="mt-6"><RegisterForm onSubmit={handleRegister} /></div>
        <p className="mt-5 text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-brand-700">Login</Link></p>
      </div>
    </PublicLayout>
  )
}
