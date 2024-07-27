import { PaletteMode } from "@mui/material"

import {
  getDefaultThemeMode,
  setItemInLocalStorage,
} from "@src/services/utils.service"
import { StoreApi, UseBoundStore, create } from "zustand"

interface UseColorMode {
  colorMode: PaletteMode
  toggleColorMode: () => void
}

export const useColorMode: UseBoundStore<StoreApi<UseColorMode>> = create((set) => ({
  colorMode: getDefaultThemeMode(),
  toggleColorMode: () => {
    set((prev) => {
      const newThemeMode = prev.colorMode === "light" ? "dark" : "light"
      setItemInLocalStorage("colorMode", newThemeMode)
      return { colorMode: newThemeMode }
    })
  },
}))
