// DonorAnalyticsPage.jsx
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'

export default function DonorAnalyticsPage() {
  return (
    <DashboardLayout>
      <SectionHeader eyebrow="Donor Analytics" title="Track your food impact" description="Analytics page placeholder for donation trends and waste reduction insights." />
      <div className="rounded-3xl bg-white p-6 shadow-soft">Charts can be added here later.</div>
    </DashboardLayout>
  )
}
