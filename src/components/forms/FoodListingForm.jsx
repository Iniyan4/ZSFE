// FoodListingForm.jsx
import { useState } from 'react'
import Button from '../common/Button'

export default function FoodListingForm({ onSubmit }) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        quantity: '',
        servings: '',
        food_category: 'Cooked Meal',
        pickup_address: '',
        prepared_at: '', // Matches backend model
        latitude: 0.0,
        longitude: 0.0
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
            <input
                name="title"
                placeholder="Food title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
            />
            <input
                name="food_category"
                placeholder="Category (e.g. Veg, Non-Veg)"
                value={form.food_category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
            />
            <input
                name="quantity"
                placeholder="Quantity (kg/units)"
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
            />
            <input
                name="servings"
                placeholder="Number of servings"
                type="number"
                value={form.servings}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
            />
            <input
                name="pickup_address"
                placeholder="Pickup address"
                value={form.pickup_address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                required
            />
            <div className="flex flex-col space-y-1">
                <label className="text-sm text-slate-500 px-1">Prepared At</label>
                <input
                    name="prepared_at"
                    type="datetime-local"
                    value={form.prepared_at}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    required
                />
            </div>

            {/* Hidden or default values for demo purposes */}
            <input type="hidden" name="latitude" value="12.97" />
            <input type="hidden" name="longitude" value="77.59" />

            <Button type="submit" className="w-full py-6 text-lg rounded-xl">
                Create listing
            </Button>
        </form>
    )

}
