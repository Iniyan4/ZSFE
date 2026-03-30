// LandingPage.jsx
import { Link } from 'react-router-dom'
import PublicLayout from '../../layouts/PublicLayout'
import Button from '../../components/common/Button'

export default function LandingPage() {
  return (
    <PublicLayout>
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Food rescue platform</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
            ZeroServe helps donate surplus food quickly and responsibly.
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Connect donors, NGOs, and delivery partners.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/register"><Button>Create account</Button></Link>
            <Link to="/login"><Button variant="secondary">Login</Button></Link>
          </div>
        </div>

        <div className="rounded-[32px] bg-gradient-to-br from-brand-100 to-brand-300 p-10 shadow-soft">
          <div className="rounded-[28px] bg-white p-6">
            <h3 className="text-2xl font-bold text-slate-900">Why ZeroServe?</h3>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>Fast food listing</li>
              <li>NGO discovery and claiming</li>
              <li>Delivery coordination</li>
              <li>Admin monitoring and reliability checks</li>
            </ul>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
