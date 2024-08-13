import { ReactNode } from "react"

import { useAuthStore } from "@stores/auth.store"
import { Navigate, Outlet } from "react-router-dom"

import { IValideUserRoles } from "@src/types/user.type"

interface PrivateRouteProps {
  children?: ReactNode
  roles?: IValideUserRoles[]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to="/login" />
  }
 

  return children ? <>{children}</> : <Outlet />
}

export default PrivateRoute
