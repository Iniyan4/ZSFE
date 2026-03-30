// PublicLayout.jsx
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
    </div>
  )
}
