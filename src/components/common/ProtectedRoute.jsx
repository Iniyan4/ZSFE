// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import { useAuth } from '../../hooks/useAuth'
import { getRoleRedirectPath } from '../../utils/roleRedirect'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getRoleRedirectPath(user?.role)} replace />
  }

  return children
}
