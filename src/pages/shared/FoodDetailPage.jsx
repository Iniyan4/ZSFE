// FoodDetailPage.jsx
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import { foodApi } from '../../api/foodApi'

export default function FoodDetailPage() {
  const { id } = useParams()
  const { data } = useQuery({ queryKey: ['food-detail', id], queryFn: () => foodApi.detail(id) })
  const item = data?.data || data || {}

  return (
    <DashboardLayout>
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-bold text-slate-900">{item.title || `Food #${id}`}</h1>
        <p className="mt-3 text-slate-600">{item.description || 'No description available.'}</p>
        <p className="mt-2 text-slate-600">Quantity: {item.quantity || '—'}</p>
        <p className="mt-2 text-slate-600">Pickup address: {item.pickup_address || '—'}</p>
      </div>
    </DashboardLayout>
  )
}
