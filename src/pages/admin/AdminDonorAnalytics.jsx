import { useQuery, useMutation } from '@tanstack/react-query'
import AdminLayout from '../../layouts/AdminLayout'
import StatCard from '../../components/common/StatCard'
import Button from '../../components/common/Button'
import { analyticsApi } from '../../api/analyticsApi'
import { aiApi } from '../../api/aiApi'
import { Box, Users, Activity, ShieldAlert } from 'lucide-react'

export default function AdminDonorAnalytics() {
    const { data: stats } = useQuery({ queryKey: ['admin-stats'], queryFn: () => analyticsApi.admin() })
    const { data: insights } = useQuery({ queryKey: ['ai-insights'], queryFn: () => aiApi.getInsights() })

    const donorStats = stats?.data?.donor || {}
    const donorInsights = insights?.data?.filter(i => i.role === 'donor') || [] // Filter AI for donors only

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Donor Analytics</h1>

            <div className="grid gap-5 md:grid-cols-4 mb-10">
                <StatCard title="Total Donated" value={donorStats.total_donated || 0} icon={Box} />
                <StatCard title="Total Servings" value={donorStats.total_servings || 0} icon={Users} />
                <StatCard title="NGOs Served" value={donorStats.ngos_served || 0} icon={Activity} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">🤖 AI Insights & Recommendations (Donors)</h2>
            <div className="space-y-4">
                {donorInsights.map(insight => (
                    <div key={insight.user_id} className="bg-white p-6 rounded-2xl shadow-soft flex justify-between items-center border-l-4 border-orange-400">
                        <div>
                            <h3 className="font-bold text-lg">{insight.username}</h3>
                            <p className="text-sm text-slate-600 mt-1">{insight.ai_summary}</p>
                            <p className="text-xs font-bold text-red-600 mt-2">Suggested Action: {insight.suggested_action}</p>
                        </div>
                        <Button variant="danger">Restrict User</Button>
                    </div>
                ))}
                {donorInsights.length === 0 && <p className="text-slate-500">No donor flags today.</p>}
            </div>
        </AdminLayout>
    )
}