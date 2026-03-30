import AdminLayout from '../../layouts/AdminLayout'

export default function AdminHome() {
    return (
        <AdminLayout>
            <div className="rounded-3xl bg-white p-10 shadow-soft text-center">
                <h1 className="text-4xl font-bold text-slate-900">Welcome back, Admin 👋</h1>
                <p className="mt-4 text-lg text-slate-600">
                    Use the sidebar to monitor platform analytics, review AI-generated insights, and manage user reliability across Donors, NGOs, and Delivery Partners.
                </p>
            </div>
        </AdminLayout>
    )
}