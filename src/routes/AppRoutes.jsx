import { BrowserRouter, Route, Routes } from 'react-router-dom' // or 'react-router-dom' depending on your setup
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import RegisterPage from '../pages/public/RegisterPage'
import NotFoundPage from '../pages/public/NotFoundPage'

import DonorDashboard from '../pages/donor/DonorDashboard'
import CreateListingPage from '../pages/donor/CreateListingPage'
import DonorAnalyticsPage from '../pages/donor/DonorAnalyticsPage'

import NgoDashboard from '../pages/ngo/NgoDashboard'
import RecommendedListingsPage from '../pages/ngo/RecommendedListingsPage'

import DeliveryDashboard from '../pages/delivery/DeliveryDashboard'
import DeliveryTaskDetailPage from '../pages/delivery/DeliveryTaskDetailPage'

// 🔥 NEW ADMIN IMPORTS 🔥
import AdminHome from '../pages/admin/AdminHome'
import AdminDonorAnalytics from '../pages/admin/AdminDonorAnalytics'
import AdminNgoAnalytics from '../pages/admin/AdminNgoAnalytics'
import AdminDeliveryAnalytics from '../pages/admin/AdminDeliveryAnalytics'
import AdminAiSummary from '../pages/admin/AdminAiSummary'

import ProfilePage from '../pages/shared/ProfilePage'
import NotificationsPage from '../pages/shared/NotificationsPage'
import FoodDetailPage from '../pages/shared/FoodDetailPage'
import ProtectedRoute from '../components/common/ProtectedRoute'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Donor Routes */}
                <Route path="/donor" element={<ProtectedRoute allowedRoles={['donor']}><DonorDashboard /></ProtectedRoute>} />
                <Route path="/donor/create" element={<ProtectedRoute allowedRoles={['donor']}><CreateListingPage /></ProtectedRoute>} />
                <Route path="/donor/analytics" element={<ProtectedRoute allowedRoles={['donor']}><DonorAnalyticsPage /></ProtectedRoute>} />

                {/* NGO Routes */}
                <Route path="/ngo" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
                <Route path="/ngo/recommended" element={<ProtectedRoute allowedRoles={['ngo']}><RecommendedListingsPage /></ProtectedRoute>} />

                {/* Delivery Routes */}
                <Route path="/delivery" element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryDashboard /></ProtectedRoute>} />
                <Route path="/delivery/task/:id" element={<ProtectedRoute allowedRoles={['delivery']}><DeliveryTaskDetailPage /></ProtectedRoute>} />

                {/* NEW ADMIN ROUTES */}
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminHome /></ProtectedRoute>} />
                <Route path="/admin/donors" element={<ProtectedRoute allowedRoles={['admin']}><AdminDonorAnalytics /></ProtectedRoute>} />
                <Route path="/admin/ngos" element={<ProtectedRoute allowedRoles={['admin']}><AdminNgoAnalytics /></ProtectedRoute>} />
                <Route path="/admin/delivery" element={<ProtectedRoute allowedRoles={['admin']}><AdminDeliveryAnalytics /></ProtectedRoute>} />
                <Route path="/admin/ai-summary" element={<ProtectedRoute allowedRoles={['admin']}><AdminAiSummary /></ProtectedRoute>} />

                {/* Shared Routes */}
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                <Route path="/food/:id" element={<ProtectedRoute><FoodDetailPage /></ProtectedRoute>} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}