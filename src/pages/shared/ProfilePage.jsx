import { useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import ProfileForm from '../../components/forms/ProfileForm'
import { profileApi } from '../../api/profileApi'

export default function ProfilePage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSave = async (values) => {
    try {
      await profileApi.update(values)
      setMessage('Profile updated successfully.')
      setError('')
    } catch {
      setError('Unable to update profile. Backend may not be connected.')
      setMessage('')
    }
  }

  return (
    <DashboardLayout>
      <SectionHeader eyebrow="Profile" title="Manage your profile" description="Update your organization and address details." />
      {message ? <p className="mb-4 text-green-700">{message}</p> : null}
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <ProfileForm onSubmit={handleSave} />
      </div>
    </DashboardLayout>
  )
}
