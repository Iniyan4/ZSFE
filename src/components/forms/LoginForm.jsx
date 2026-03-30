// LoginForm.jsx
import { useState } from 'react'
import Button from '../common/Button'

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
      <Button type="submit" className="w-full">Login</Button>
    </form>
  )
}
