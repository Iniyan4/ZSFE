// ProfileForm.jsx
import { useState } from 'react'
import Button from '../common/Button'

export default function ProfileForm({ initialValues = {}, onSubmit }) {
  const [form, setForm] = useState({
    organization_name: initialValues.organization_name || '',
    address: initialValues.address || '',
    city: initialValues.city || '',
    state: initialValues.state || '',
    pincode: initialValues.pincode || '',
  })

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="organization_name" placeholder="Organization name" value={form.organization_name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
      <div className="grid gap-4 md:grid-cols-3">
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="rounded-xl border border-slate-300 px-4 py-3" />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="rounded-xl border border-slate-300 px-4 py-3" />
      </div>
      <Button type="submit">Save profile</Button>
    </form>
  )
}
