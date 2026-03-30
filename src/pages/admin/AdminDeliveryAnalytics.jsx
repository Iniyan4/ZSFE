import { useQuery } from '@tanstack/react-query'
import AdminLayout from '../../layouts/AdminLayout'
import StatCard from '../../components/common/StatCard'
import Button from '../../components/common/Button'
import { analyticsApi } from '../../api/analyticsApi'
import { aiApi } from '../../api/aiApi'
import { Truck, ShieldCheck, Activity, MapPinned } from 'lucide-react'

export default function AdminDeliveryAnalytics() {
    // Fetch platform-wide stats
    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: () => analyticsApi.admin()
    })

    // Fetch AI insights
    const { data: insights } = useQuery({
        queryKey: ['ai-insights'],
        queryFn: () => aiApi.getInsights()
    })

    // Safely extract Delivery data, fallback to empty object if undefined
    const deliveryStats = stats?.data?.delivery || {}

    // Filter insights only for users with the 'delivery' role
    const deliveryInsights = insights?.data?.filter(i => i.role === 'delivery') || []

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Truck className="text-brand-600 w-8 h-8" /> Delivery Partner Analytics
                </h1>
                <p className="text-slate-600 mt-2">Track logistics success rates, active tasks, and AI reliability metrics for your delivery fleet.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
                <StatCard title="Total Completed" value={deliveryStats.completed || 0} icon={ShieldCheck} />
                <StatCard title="Success Rate" value={deliveryStats.success_rate || '0%'} icon={Activity} />
                <StatCard title="Customers Served" value={deliveryStats.customers_served || 0} icon={MapPinned} />
                <StatCard title="Active History" value={deliveryStats.active_now || 0} icon={Truck} />
            </div>

            {/* AI Insights Section */}
            <h2 className="text-2xl font-bold text-slate-900 mb-4">🤖 AI Insights & Recommendations (Fleet)</h2>
            <div className="space-y-4">
                {deliveryInsights.length > 0 ? deliveryInsights.map(insight => (
                    <div key={insight.user_id} className="bg-white p-6 rounded-2xl shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-orange-400">
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg text-slate-900">{insight.username}</h3>
                                <span className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 uppercase border border-slate-200">
                  {insight.risk_classification} RISK
                </span>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">{insight.ai_summary}</p>
                            <p className="text-xs font-bold text-brand-700 mt-3 uppercase">
                                Suggested Action: {insight.suggested_action}
                            </p>
                        </div>
                        <Button variant="danger" className="whitespace-nowrap">
                            Restrict Partner
                        </Button>
                    </div>
                )) : (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                        <p className="text-slate-500 font-medium">No delivery partners have been flagged by the AI today. Fleet operations are running smoothly.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}