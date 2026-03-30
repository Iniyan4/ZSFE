// DeliveryTimeline.jsx
import { formatDateTime } from '../../utils/formatters'

export default function DeliveryTimeline({ items = [] }) {
  if (!items.length) {
    return <p className="text-slate-500">No delivery updates yet.</p>
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-semibold text-slate-900">{item.status || 'Update'}</p>
          <p className="mt-1 text-sm text-slate-600">{item.note || 'No note available'}</p>
          <p className="mt-2 text-xs text-slate-500">{formatDateTime(item.created_at)}</p>
        </div>
      ))}
    </div>
  )
}
