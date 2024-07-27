import { IRole } from "@src/types/user.type"
import { ReactElement } from "react"

export interface ISideBarListItem {
  id: string
  icon: ReactElement
  label: string
  action?: () => void
  link?: string
  roles: IRole["role"][]
}
