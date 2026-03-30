import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LayoutDashboard, Users, Building2, Truck, Sparkles, LogOut } from 'lucide-react'
import { cn } from '../utils/cn'

export default function AdminLayout({ children }) {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const links = [
        { name: 'Welcome', path: '/admin', icon: LayoutDashboard },
        { name: 'Donor Analytics', path: '/admin/donors', icon: Users },
        { name: 'NGO Analytics', path: '/admin/ngos', icon: Building2 },
        { name: 'Delivery Analytics', path: '/admin/delivery', icon: Truck },
        { name: 'AI Summary of the Day', path: '/admin/ai-summary', icon: Sparkles },
    ]

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-brand-400">ZeroServe Admin</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon
                        const isActive = location.pathname === link.path
                        return (
                            <Link key={link.name} to={link.path} className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition", isActive ? "bg-brand-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white")}>
                                <Icon className="w-5 h-5" /> {link.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4">
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}