// SectionHeader.jsx
export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>}
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
      {description && <p className="mt-3 max-w-3xl text-slate-600">{description}</p>}
    </div>
  )
}
