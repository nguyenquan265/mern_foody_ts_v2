import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  console.log(isAuthenticated, isLoading)

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to='/' replace />
}

export default ProtectedRoute
