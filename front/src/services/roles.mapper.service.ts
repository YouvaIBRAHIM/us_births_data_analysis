import { IRole } from "@src/types/user.type"

export const formatRoles = (roles: IRole["role"][]) => {
  return roles
    .map((role) => {
      return rolesMapper(role)
    })
    .join(", ")
}

export const rolesMapper = (role: string) => {
  switch (role) {
    case "admin":
      return "Administrateur"
    case "editor":
      return "Éditeur"
    case "player":
      return "Joueur"
    default:
      return `Rôle inconnu (${role})`
  }
}
