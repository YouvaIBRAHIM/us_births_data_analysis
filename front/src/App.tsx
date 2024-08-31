import { useEffect, useMemo } from "react"

import { ThemeProvider, createTheme } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"

import SnackBarProvider from "@components/SnackbarProvider"
import { useAuthStore } from "@stores/auth.store"
import { useColorMode } from "@stores/theme.store"
import router from "@routers/router"
import { getTheme } from "@services/theme.service"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import "@services/translation.service"

const queryClient = new QueryClient()

function App() {
  const { colorMode } = useColorMode()
  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode])

  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackBarProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SnackBarProvider>
    </ThemeProvider>
  )
}

export default App
