// Badge.jsx
export default function Badge({ children }) {
  return (
    <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
      {children}
    </span>
  )
}
