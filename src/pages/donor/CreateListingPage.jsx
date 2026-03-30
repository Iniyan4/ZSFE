// CreateListingPage.jsx
import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import FoodListingForm from '../../components/forms/FoodListingForm'
import { foodApi } from '../../api/foodApi'

export default function CreateListingPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleCreate = async (values) => {
    try {
      await foodApi.create(values)
      setMessage('Food listing created successfully.')
      setError('')
    } catch {
      setError('Unable to create listing. Backend may not be connected.')
      setMessage('')
    }
  }

  return (
    <DashboardLayout>
      <SectionHeader eyebrow="Donor" title="Create food listing" description="Add donation details so NGOs can claim the food quickly." />
      {message ? <p className="mb-4 text-green-700">{message}</p> : null}
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <FoodListingForm onSubmit={handleCreate} />
      </div>
    </DashboardLayout>
  )
}
