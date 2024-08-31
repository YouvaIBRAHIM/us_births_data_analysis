import { ReactNode } from "react"

import { useAuthStore } from "@stores/auth.store"
import { Navigate, Outlet } from "react-router-dom"


interface IUnauthenticatedRouteProps {
  children?: ReactNode
}

const UnauthenticatedRoute = ({ children }: IUnauthenticatedRouteProps) => {
  const { user } = useAuthStore()

  if (user) {
    return <Navigate to="/" />
  }

  return children ? <>{children}</> : <Outlet />
}

export default UnauthenticatedRoute
