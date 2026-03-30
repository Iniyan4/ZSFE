// RegisterForm.jsx
import { useState } from 'react'
import Button from '../common/Button'

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'donor',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" required />
      <select name="role" value={form.role} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3">
        <option value="donor">Donor</option>
        <option value="ngo">NGO</option>
        <option value="delivery_partner">Delivery Partner</option>
      </select>
      <Button type="submit" className="w-full">Create account</Button>
    </form>
  )
}
