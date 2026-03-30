// RecommendedListingsPage.jsx
import DashboardLayout from '../../layouts/DashboardLayout'
import SectionHeader from '../../components/common/SectionHeader'

export default function RecommendedListingsPage() {
  return (
    <DashboardLayout>
      <SectionHeader eyebrow="NGO" title="Recommended listings" description="Recommended listings page placeholder." />
      <div className="rounded-3xl bg-white p-6 shadow-soft">Recommended food cards will come here.</div>
    </DashboardLayout>
  )
}
