import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import Button from '../../components/common/Button'
import { foodApi } from '../../api/foodApi'
import { claimApi } from '../../api/claimApi'
import { AlertTriangle, CheckCircle, Clock, XCircle, MapPinned, Info } from 'lucide-react'

export default function NgoDashboard() {
    const queryClient = useQueryClient()

    // --- DATA FETCHING ---
    const { data: foodData } = useQuery({
        queryKey: ['available-food'],
        queryFn: () => foodApi.list()
    })
    const { data: claimsRes } = useQuery({
        queryKey: ['my-claims'],
        queryFn: () => claimApi.listNgoClaims()
    })

    const foods = foodData?.data || []
    const myClaims = claimsRes?.data || []

    // --- STATE FILTERS ---
    const pendingApproval = myClaims.filter(c => c.status === 'requested')
    const activeDeliveries = myClaims.filter(c => c.status === 'accepted' && c.delivery_status !== 'delivered')
    const awaitingVerification = myClaims.filter(c => c.status === 'accepted' && c.delivery_status === 'delivered')
    const completedClaims = myClaims.filter(c => c.status === 'completed')
    const rejectedClaims = myClaims.filter(c => c.status === 'rejected')

    // Filter out foods that this NGO has already been rejected for
    const rejectedFoodIds = rejectedClaims.map(c => c.food?.id || c.food_id || c.food)
    const availableFoods = foods.filter(f => !rejectedFoodIds.includes(f.id))

    // --- MUTATIONS ---
    const claimMutation = useMutation({
        mutationFn: (id) => claimApi.create(id, { message: "Requesting rescue for this listing." }),
        onSuccess: () => {
            alert("Food claimed! Waiting for donor approval.")
            queryClient.invalidateQueries(['available-food', 'my-claims'])
        }
    })

    const verifyMutation = useMutation({
        mutationFn: (id) => claimApi.verify(id),
        onSuccess: () => {
            alert("Delivery verified and completed!")
            queryClient.invalidateQueries(['my-claims'])
        }
    })

    const disputeMutation = useMutation({
        mutationFn: (id) => claimApi.dispute(id),
        onSuccess: () => {
            alert("Issue reported. The admin will review the delivery partner's behavior.")
            queryClient.invalidateQueries(['my-claims'])
        }
    })

    return (
        <DashboardLayout>
            <SectionHeader
                eyebrow="NGO Dashboard"
                title="Food Rescue Hub"
                description="Coordinate active rescues, verify deliveries, and browse nearby donations."
            />

            {/* --- SECTION: PENDING VERIFICATION (URGENT ACTION) --- */}
            {awaitingVerification.length > 0 && (
                <div className="mb-8 p-6 bg-orange-50 border border-orange-200 rounded-[32px] shadow-sm">
                    <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6"/> Confirm Receipt
                    </h2>
                    <div className="space-y-4">
                        {awaitingVerification.map(claim => (
                            <div key={claim.id} className="bg-white p-5 rounded-2xl shadow-soft flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-orange-100">
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 truncate text-lg">{claim.food_title}</p>
                                    <p className="text-sm text-slate-600 mt-1">The partner marked this as delivered. Please confirm you have received it.</p>
                                </div>
                                <div className="flex gap-3 w-full md:w-auto shrink-0">
                                    <Button variant="danger" className="flex-1 md:flex-none" onClick={() => disputeMutation.mutate(claim.id)}>
                                        <XCircle className="w-4 h-4 mr-2"/> Dispute
                                    </Button>
                                    <Button className="flex-1 md:flex-none" onClick={() => verifyMutation.mutate(claim.id)}>
                                        <CheckCircle className="w-4 h-4 mr-2"/> Confirm
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-2 mb-10">
                {/* --- SECTION: ACTIVE TRACKER --- */}
                <div className="rounded-[32px] bg-white p-8 shadow-soft border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-brand-600"/> Active Claims
                    </h2>
                    <div className="space-y-4">
                        {pendingApproval.map(c => (
                            <div key={c.id} className="flex justify-between items-center gap-4 border-b border-slate-50 pb-4">
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-800 truncate">{c.food_title}</p>
                                    <p className="text-xs text-slate-500">Requested on {new Date(c.created_at).toLocaleDateString()}</p>
                                </div>
                                <span className="text-yellow-600 text-xs font-bold bg-yellow-50 px-3 py-1 rounded-full shrink-0">
                                    AWAITING DONOR
                                </span>
                            </div>
                        ))}
                        {activeDeliveries.map(c => (
                            <div key={c.id} className="flex justify-between items-center gap-4 border-b border-slate-50 pb-4">
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-800 truncate">{c.food_title}</p>
                                    <p className="text-xs text-slate-500 uppercase font-semibold text-blue-500">
                                        Status: {c.delivery_status || 'Partner Assigned'}
                                    </p>
                                </div>
                                <span className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1 rounded-full shrink-0">
                                    IN TRANSIT
                                </span>
                            </div>
                        ))}
                        {pendingApproval.length === 0 && activeDeliveries.length === 0 && (
                            <div className="text-center py-6">
                                <p className="text-slate-400 text-sm italic">No active claims at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- SECTION: HISTORY --- */}
                <div className="rounded-[32px] bg-slate-50 p-8 border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600"/> Rescue History
                    </h2>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {completedClaims.map(c => (
                            <div key={c.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-green-100">
                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0"/>
                                <span className="text-sm font-semibold text-slate-700 truncate">{c.food_title}</span>
                                <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">DONE</span>
                            </div>
                        ))}
                        {rejectedClaims.map(c => (
                            <div key={c.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-100 opacity-75">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0"/>
                                <span className="text-sm font-semibold text-slate-700 truncate">{c.food_title}</span>
                                <span className="ml-auto text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">Rejected</span>
                            </div>
                        ))}
                        {completedClaims.length === 0 && rejectedClaims.length === 0 && (
                            <p className="text-slate-400 text-sm text-center italic py-4">No completed rescues yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- SECTION: BROWSE --- */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPinned className="text-brand-600"/> Available Nearby
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {availableFoods.length > 0 ? availableFoods.map(food => (
                    <div key={food.id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft hover:border-brand-300 transition-colors flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-xl text-slate-900 leading-tight truncate pr-2">{food.title}</h3>
                            <span className={`shrink-0 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                                food.urgency_score > 70 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {food.urgency_score > 70 ? 'High Urgency' : 'Rescue Soon'}
                            </span>
                        </div>

                        {/* URGENCY PROGRESS BAR */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Urgency Score</span>
                                <span className="text-[10px] font-bold text-slate-700">{food.urgency_score}/100</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${food.urgency_score > 70 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                    style={{ width: `${food.urgency_score}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 mb-6">
                            <MapPinned className="w-4 h-4 shrink-0 text-slate-400"/>
                            <p className="text-sm truncate">{food.pickup_address}</p>
                        </div>

                        <Button
                            className="w-full mt-auto rounded-2xl"
                            onClick={() => claimMutation.mutate(food.id)}
                            disabled={claimMutation.isPending}
                        >
                            {claimMutation.isPending ? 'Processing...' : 'Claim for Rescue'}
                        </Button>
                    </div>
                )) : (
                    <div className="col-span-full bg-slate-100 border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center">
                        <Info className="w-10 h-10 text-slate-300 mx-auto mb-3"/>
                        <h3 className="text-slate-900 font-bold text-lg">No food available nearby</h3>
                        <p className="text-slate-500 mt-1">Check back later for new rescue opportunities.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}