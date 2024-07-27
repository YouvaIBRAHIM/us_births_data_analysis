import { AlertProps } from "@mui/material"

import { create } from "zustand"

interface SnackBarState {
  open: boolean
  message: string
  typeColor: AlertProps["color"]
  showSnackBar: (text: string, typeColor: AlertProps["color"]) => void
  closeSnackBar: () => void
}

export const useSnackBarStore = create<SnackBarState>((set) => ({
  open: false,
  message: "",
  typeColor: "info",
  showSnackBar: (text: string, typeColor: AlertProps["color"]) => {
    set({ message: text, typeColor, open: true })
  },
  closeSnackBar: () => {
    set((state) => ({ ...state, open: false }))
  },
}))
