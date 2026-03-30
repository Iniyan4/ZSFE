import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import DashboardLayout from '../../layouts/DashboardLayout'
import Button from '../../components/common/Button'
import { deliveryApi } from '../../api/deliveryApi'
import { Link } from 'react-router-dom'

export default function DeliveryDashboard() {
    const queryClient = useQueryClient()
    const { data } = useQuery({ queryKey: ['my-tasks'], queryFn: () => deliveryApi.myTasks() })

    const tasks = data?.data || []

    const assignedTasks = tasks.filter(t => t.status === 'assigned')

    const activeTasks = tasks.filter(t => ['accepted', 'picked_up', 'in_transit'].includes(t.status) && t.claim_status !== 'disputed');
    const incompleteTasks = tasks.filter(t => t.claim_status === 'disputed');

    // Delivered by partner, but NGO hasn't verified yet
    const awaitingVerification = tasks.filter(t => t.status === 'delivered' && t.claim_status !== 'completed')

    // Only officially completed when NGO verifies
    const completedTasks = tasks.filter(t => t.status === 'delivered' && t.claim_status === 'completed')

    // Mutations
    const acceptMutation = useMutation({ mutationFn: (id) => deliveryApi.accept(id), onSuccess: () => queryClient.invalidateQueries(['my-tasks']) })
    const rejectMutation = useMutation({ mutationFn: (id) => deliveryApi.reject(id), onSuccess: () => queryClient.invalidateQueries(['my-tasks']) })

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-8">Delivery Dashboard</h1>

            {/* ASSIGNED */}
            <h2 className="text-xl font-bold mb-4">New Assignments</h2>
            <div className="grid gap-4 mb-8">
                {assignedTasks.map(task => (
                    <div key={task.id} className="bg-white p-5 rounded-2xl shadow-soft border flex justify-between items-center">
                        <div><p className="font-bold">Pickup: {task.pickup_address}</p></div>
                        <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => rejectMutation.mutate(task.id)}>Reject</Button>
                            <Button onClick={() => acceptMutation.mutate(task.id)}>Accept</Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ACTIVE */}
            <h2 className="text-xl font-bold mb-4">Active Deliveries</h2>
            <div className="grid gap-4 mb-8">
                {activeTasks.map(task => (
                    <div key={task.id} className="bg-brand-50 p-5 rounded-2xl border border-brand-200 flex justify-between items-center">
                        <p className="font-bold">Status: <span className="uppercase text-brand-600">{task.status}</span></p>
                        <Link to={`/delivery/task/${task.id}`}><Button>Update Status</Button></Link>
                    </div>
                ))}
            </div>

            {/* AWAITING NGO VERIFICATION */}
            {awaitingVerification.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-orange-600">Pending NGO Verification</h2>
                    {awaitingVerification.map(task => (
                        <div key={task.id} className="bg-orange-50 p-5 rounded-2xl border border-orange-200">
                            <p className="font-semibold text-orange-800">Task #{task.id} - You marked as delivered. Waiting for NGO to confirm.</p>
                        </div>
                    ))}
                </div>
            )}

            {/* VERIFIED/COMPLETED */}
            <h2 className="text-xl font-bold mb-4">Verified Completed Orders</h2>
            <div className="grid gap-4">
                {completedTasks.map(task => (
                    <div key={task.id} className="bg-green-50 p-5 rounded-2xl border border-green-200">
                        <p className="font-semibold text-green-700">Successfully Delivered & Verified: Task #{task.id}</p>
                    </div>
                ))}
            </div>

            {incompleteTasks.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-red-600">Incomplete / Disputed Tasks</h2>
                    {incompleteTasks.map(task => (
                        <div key={task.id} className="bg-red-50 p-5 rounded-2xl border border-red-200">
                            <p className="font-bold text-red-800">Task #{task.id} - Disputed by NGO</p>
                            <p className="text-sm text-red-600">This has impacted your reliability score.</p>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    )
}

