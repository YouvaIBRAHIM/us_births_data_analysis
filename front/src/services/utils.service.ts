import { PaletteMode } from "@mui/material"

import { IUser, IUserSearch } from "@src/types/user.type"

export const truncateString = (string: string, maxLength: number) => {
  return string.length > maxLength
    ? string.substring(0, maxLength - 3) + "..."
    : string
}

export const getItemFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch (error) {
    return null
  }
}

export const setItemInLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.error(`Impossible d'enregistrer la clé ${key} dans le localStorage.`)
  }
}

export const getDefaultThemeMode = (): PaletteMode => {
  const colorMode = getItemFromLocalStorage("colorMode")
  const themeModeFromLocalStorage = colorMode && JSON.parse(colorMode)

  if (!themeModeFromLocalStorage) {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return themeModeFromLocalStorage
}

export const descendingComparator = (
  a: IUser,
  b: IUser,
  orderBy: IUserSearch["searchBy"],
): number => {
  const from =
    orderBy !== "name" ? a[orderBy] : `${a["first_name"]} ${a["last_name"]}`
  const to = orderBy !== "name" ? b[orderBy] : `${b["first_name"]} ${b["last_name"]}`

  if (to < from) {
    return -1
  }
  if (to > from) {
    return 1
  }
  return 0
}

export const getComparator = (
  order: IUserSearch["order"],
  orderBy: IUserSearch["searchBy"],
) => {
  return order === "desc"
    ? (a: IUser, b: IUser) => descendingComparator(a, b, orderBy)
    : (a: IUser, b: IUser) => -descendingComparator(a, b, orderBy)
}

export const stableSort = (
  array: IUser[],
  comparator: (a: IUser, b: IUser) => number,
) => {
  const stabilizedThis: [IUser, number][] = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })

  return stabilizedThis.map((el) => el[0])
}

export const checkResponse = async (response: Response): Promise<unknown | void> => {
  const data = await response.json()
  if (!response.ok) {    
    throw new Error(data || "Une erreur est survenue")
  }

  return data
}
