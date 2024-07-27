import { ReactNode } from "react"

import { Alert, Snackbar } from "@mui/material"

import { useSnackBarStore } from "@src/stores/snackbar.store"

const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  const { open, message, typeColor, closeSnackBar } = useSnackBarStore()

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity={typeColor}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </>
  )
}

export default SnackBarProvider
