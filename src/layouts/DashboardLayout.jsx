// DashboardLayout.jsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getRoleRedirectPath } from '../utils/roleRedirect'

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to={getRoleRedirectPath(user?.role)} className="text-2xl font-bold text-brand-700">
            ZeroServe
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/profile" className="text-sm font-medium text-slate-700">Profile</Link>
            <Link to="/notifications" className="text-sm font-medium text-slate-700">Notifications</Link>
            <button onClick={handleLogout} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  )
}
