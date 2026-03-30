// StatCard.jsx
export default function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>
        {Icon ? <Icon className="h-8 w-8 text-brand-600" /> : null}
      </div>
    </div>
  )
}
