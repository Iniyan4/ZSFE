// NotificationsPage.jsx
import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import { notificationApi } from '../../api/notificationApi'

export default function NotificationsPage() {
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationApi.list(),
  })

  const items = data?.data || data || []

  return (
    <DashboardLayout>
      <SectionHeader eyebrow="Notifications" title="Recent updates" description="Track alerts, claims, and delivery changes." />
      <div className="space-y-4">
        {items.length ? items.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-5 shadow-soft">
            <h3 className="font-semibold text-slate-900">{item.title || 'Notification'}</h3>
            <p className="mt-2 text-slate-600">{item.message || 'No message available.'}</p>
          </div>
        )) : (
          <div className="rounded-3xl bg-white p-6 shadow-soft">No notifications found.</div>
        )}
      </div>
    </DashboardLayout>
  )
}
