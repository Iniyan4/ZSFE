// DeliveryTaskDetailPage.jsx
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import { deliveryApi } from '../../api/deliveryApi'
import DeliveryTimeline from '../../components/timeline/DeliveryTimeline'
import Button from '../../components/common/Button'

export default function DeliveryTaskDetailPage() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data: detailRes } = useQuery({ queryKey: ['delivery-detail', id], queryFn: () => deliveryApi.detail(id) })
  const { data: timelineRes } = useQuery({ queryKey: ['delivery-timeline', id], queryFn: () => deliveryApi.timeline(id) })

  const detail = detailRes?.data || detailRes || {}
  const timeline = timelineRes?.data || timelineRes || []

  const statusMutation = useMutation({
    mutationFn: (status) => deliveryApi.updateStatus(id, { status, note: `Updated to ${status}` }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-detail', id] })
      queryClient.invalidateQueries({ queryKey: ['delivery-timeline', id] })
    },
  })

  return (
    <DashboardLayout>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h1 className="text-3xl font-bold text-slate-900">Delivery Task #{id}</h1>
          <p className="mt-3 text-slate-600">Pickup address: {detail.pickup_address || 'Not available'}</p>
          <p className="text-slate-600">Drop address: {detail.drop_address || 'Not available'}</p>
          <p className="text-slate-600">Current status: {detail.status || 'Pending'}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => statusMutation.mutate('picked_up')}>Mark Picked Up</Button>
            <Button variant="secondary" onClick={() => statusMutation.mutate('in_transit')}>Mark In Transit</Button>
            <Button onClick={() => statusMutation.mutate('delivered')}>Mark Delivered</Button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-slate-900">Timeline</h2>
          <div className="mt-4"><DeliveryTimeline items={timeline} /></div>
        </div>
      </div>
    </DashboardLayout>
  )
}
