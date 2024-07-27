import { useAuthStore } from "@src/stores/auth.store"
import { IRole, IValideUserRoles } from "@src/types/user.type"

const useIsAuthorized = () => {
  const userRoles = useAuthStore((state) => state.user?.roles || [])
  function isAuthorized(roles: IRole["role"][] = []) {
    return roles.includes("all")
      ? true
      : !!(roles as IValideUserRoles[]).filter((role) => userRoles.includes(role))
          .length
  }

  return {
    isAuthorized,
  }
}

export default useIsAuthorized
