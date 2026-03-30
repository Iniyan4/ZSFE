import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { aiApi } from '../../api/aiApi'
import { reliabilityApi } from '../../api/reliabilityApi'
import { ShieldAlert, CheckCircle, Search, Ban } from 'lucide-react'

export default function ReviewCenterPage() {
    const queryClient = useQueryClient()

    // Fetch AI Insights for users
    const { data: insightsData, isLoading } = useQuery({
        queryKey: ['ai-insights'],
        queryFn: () => aiApi.getInsights()
    })

    const insights = insightsData?.data || []

    // Final Action Mutation
    const actionMutation = useMutation({
        mutationFn: ({ userId, action }) => reliabilityApi.restrictUser(userId, { action }), // Adjusted to pass the specific action
        onSuccess: (_, variables) => {
            alert(`User marked as: ${variables.action}`)
            queryClient.invalidateQueries(['ai-insights'])
        }
    })

    const getRiskColor = (risk) => {
        switch(risk?.toLowerCase()) {
            case 'low': return 'bg-green-100 text-green-800 border-green-200'
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
            case 'critical': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-slate-100 text-slate-800 border-slate-200'
        }
    }

    if (isLoading) return <DashboardLayout><LoadingSpinner /></DashboardLayout>

    return (
        <DashboardLayout>
            <SectionHeader
                eyebrow="Admin Moderation"
                title="🤖 AI Insight Panel"
                description="AI-generated behavior summaries and risk classifications for platform users."
            />

            <div className="space-y-6">
                {insights.length > 0 ? insights.map((insight) => (
                    <div key={insight.user_id} className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                            {/* User Info & Risk Badge */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{insight.username}</h3>
                                    <span className="text-sm font-semibold text-slate-500 uppercase px-2 py-1 bg-slate-100 rounded-md">
                    {insight.role}
                  </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(insight.risk_classification)}`}>
                    {insight.risk_classification?.toUpperCase()} RISK
                  </span>
                                </div>

                                {/* AI Summary */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-3">
                                    <p className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                                        🤖 AI Behavior Summary
                                    </p>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {insight.ai_summary || "Analyzing behavior patterns..."}
                                    </p>
                                </div>
                            </div>

                            {/* Suggested Action & Controls */}
                            <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Suggested Action</p>
                                    <p className="text-sm font-semibold text-brand-700 mb-4">{insight.suggested_action?.toUpperCase() || 'REVIEW'}</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => actionMutation.mutate({ userId: insight.user_id, action: 'approve' })}
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-lg transition"
                                    >
                                        <CheckCircle className="w-4 h-4"/> Approve
                                    </button>
                                    <button
                                        onClick={() => actionMutation.mutate({ userId: insight.user_id, action: 'review' })}
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold rounded-lg transition"
                                    >
                                        <Search className="w-4 h-4"/> Review
                                    </button>
                                    <button
                                        onClick={() => actionMutation.mutate({ userId: insight.user_id, action: 'restrict' })}
                                        className="flex items-center justify-center gap-2 w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition"
                                    >
                                        <Ban className="w-4 h-4"/> Restrict
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )) : (
                    <div className="rounded-3xl bg-white p-8 text-center shadow-soft border border-slate-200">
                        <ShieldAlert className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-slate-900">No active insights</h3>
                        <p className="text-slate-500 mt-1">AI is currently monitoring the platform. No users require immediate review.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}