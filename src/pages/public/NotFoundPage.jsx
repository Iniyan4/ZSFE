// NotFoundPage.jsx
import { Link } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout'

export default function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-3 text-slate-600">Page not found.</p>
        <Link to="/" className="mt-5 inline-block font-semibold text-brand-700">Go home</Link>
      </div>
    </PublicLayout>
  )
}
