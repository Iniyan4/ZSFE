import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'
import Button from '../../components/common/Button'
import { foodApi } from '../../api/foodApi'
import { claimApi } from '../../api/claimApi'
import { deliveryApi } from '../../api/deliveryApi'
import { CheckCircle, XCircle, Clock, Package } from 'lucide-react'

export default function DonorDashboard() {
    const queryClient = useQueryClient()

    // Fetch data
    const { data: foodRes } = useQuery({ queryKey: ['my-foods'], queryFn: () => foodApi.list() })
    const { data: claimsRes } = useQuery({ queryKey: ['my-claims'], queryFn: () => claimApi.listNgoClaims() }) // Or specific donor claims endpoint

    const foods = foodRes?.data || []
    const claims = claimsRes?.data || []

    // Filters
    const activeFoods = foods.filter(f => f.status === 'available')
    const pendingRequests = claims.filter(c => c.status === 'requested')
    const historyClaims = claims.filter(c => c.status === 'accepted' || c.status === 'completed')

    // Mutations
    const approveMutation = useMutation({
        mutationFn: async (claimId) => {
            await claimApi.accept(claimId) // Backend handles the delivery creation automatically now!
        },
        onSuccess: () => {
            alert("Claim approved! Delivery partner assigned.")
            queryClient.invalidateQueries({ queryKey: ['my-claims'] })
            queryClient.invalidateQueries({ queryKey: ['my-foods'] })
        }
    })

    const rejectMutation = useMutation({
        mutationFn: (claimId) => claimApi.reject(claimId), // 🔥 Changed
        onSuccess: () => {
            alert("Claim rejected. NGO flagged.")
            queryClient.invalidateQueries({ queryKey: ['my-claims'] })
            queryClient.invalidateQueries({ queryKey: ['my-foods'] })
        }
    })

    return (
        <DashboardLayout>
            <SectionHeader eyebrow="Donor" title="Donation Hub" />
            <div className="mb-6"><Link to="/donor/create"><Button>+ New Donation</Button></Link></div>

            {/* PENDING NGO REQUESTS */}
            {pendingRequests.length > 0 && (
                <div className="mb-8 rounded-3xl bg-brand-50 p-6 border border-brand-200">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-brand-600"/> Action Required: NGO Requests</h2>
                    {pendingRequests.map(claim => (
                        <div key={claim.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center mb-3">
                            <div>
                                <p className="font-bold">Food: {claim.food_title}</p>
                                <p className="text-sm text-slate-600">Requested by NGO #{claim.ngo_id}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="danger" onClick={() => rejectMutation.mutate(claim.id)}><XCircle className="w-4 h-4 mr-2"/> Reject & Flag</Button>
                                <Button onClick={() => approveMutation.mutate(claim.id)}><CheckCircle className="w-4 h-4 mr-2"/> Approve</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="grid gap-6 xl:grid-cols-2">
                {/* ACTIVE LISTINGS */}
                <div className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Package className="w-5 h-5"/> Active Listings</h2>
                    {activeFoods.length > 0 ? activeFoods.map(food => (
                        <div key={food.id} className="mb-3 border-b pb-3 last:border-0"><p className="font-bold">{food.title}</p><p className="text-sm text-green-600">Available</p></div>
                    )) : <p className="text-slate-500">No active listings.</p>}
                </div>

                {/* IN PROGRESS / COMPLETED */}
                <div className="rounded-3xl bg-white p-6 shadow-soft border border-slate-200">
                    <h2 className="text-xl font-bold mb-4">In Progress / Completed</h2>
                    {historyClaims.length > 0 ? historyClaims.map(claim => (
                        <div key={claim.id} className="mb-3 border-b pb-3 last:border-0">
                            <p className="font-bold">{claim.food_title}</p>
                            <p className="text-sm uppercase font-semibold text-brand-600">{claim.status}</p>
                        </div>
                    )) : <p className="text-slate-500">No history yet.</p>}
                </div>
            </div>
        </DashboardLayout>
    )
}