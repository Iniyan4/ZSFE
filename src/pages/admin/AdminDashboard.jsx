import { useQuery } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import StatCard from '../../components/common/StatCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { Building2, Heart, Truck, Activity, Box, Users, ShieldCheck, MapPinned } from 'lucide-react'
import { analyticsApi } from '../../api/analyticsApi'

export default function AdminDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ['admin-analytics'],
        queryFn: () => analyticsApi.admin()
    })

    if (isLoading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>

    const stats = data?.data || {}

    return (
        <DashboardLayout>
            <SectionHeader
                eyebrow="Admin Dashboard"
                title="Platform Performance Monitoring"
                description="Comprehensive metrics across all user roles."
            />

            {/* DONOR PERFORMANCE */}
            <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-2"><Heart className="text-brand-600"/> Donor Performance</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Food Donated" value={stats?.donor?.total_donated || 0} icon={Box} />
                <StatCard title="Total Servings" value={stats?.donor?.total_servings || 0} icon={Users} />
                <StatCard title="NGOs Served" value={stats?.donor?.ngos_served || 0} icon={Building2} />
                <StatCard title="Today's Donations" value={stats?.donor?.daily_summary || 0} icon={Activity} />
            </div>

            {/* NGO PERFORMANCE */}
            <h2 className="text-xl font-bold text-slate-900 mb-4 mt-10 flex items-center gap-2"><Building2 className="text-brand-600"/> NGO Performance</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Food Received" value={stats?.ngo?.food_received || 0} icon={Box} />
                <StatCard title="Deliveries Completed" value={stats?.ngo?.deliveries_completed || 0} icon={ShieldCheck} />
                <StatCard title="Donors Served" value={stats?.ngo?.donors_served || 0} icon={Heart} />
                <StatCard title="Partners Involved" value={stats?.ngo?.partners_involved || 0} icon={Truck} />
            </div>

            {/* DELIVERY PARTNER PERFORMANCE */}
            <h2 className="text-xl font-bold text-slate-900 mb-4 mt-10 flex items-center gap-2"><Truck className="text-brand-600"/> Delivery Partner Performance</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-8">
                <StatCard title="Total Completed" value={stats?.delivery?.completed || 0} icon={ShieldCheck} />
                <StatCard title="Success Rate" value={stats?.delivery?.success_rate || '0%'} icon={Activity} />
                <StatCard title="Customers Served" value={stats?.delivery?.customers_served || 0} icon={MapPinned} />
                <StatCard title="Active History" value={stats?.delivery?.active_now || 0} icon={Truck} />
            </div>
        </DashboardLayout>
    )
}