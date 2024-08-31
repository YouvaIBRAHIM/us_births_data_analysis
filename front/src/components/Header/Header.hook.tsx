import { useMemo } from "react"

import { Avatar, ListItemIcon, Theme, useMediaQuery } from "@mui/material"

import { SignOut, User } from "@phosphor-icons/react"
import { useAuthStore } from "@src/stores/auth.store"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useSnackBarStore } from "@src/stores/snackbar.store"

const useHeader = () => {
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  )
  
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const { showSnackBar } = useSnackBarStore()

  const {mutate: onLogout} = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate("/login")
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const menu = useMemo(
    () => ({
      label: "Menu",
      openIcon: <Avatar sx={{ width: 32, height: 32 }}>{(user?.first_name ?? 'U')[0].toUpperCase()}</Avatar>,
      options: [
        [
          {
            label: "Mon compte",
            icon: (
              <Avatar>
                <User size={24} />
              </Avatar>
            ),
            action: () => navigate("/profile"),
          },
        ],
        [
          {
            label: "Se déconnecter",
            icon: (
              <ListItemIcon sx={(theme) => ({ color: theme.palette.error.main })}>
                <SignOut size={24} />
              </ListItemIcon>
            ),
            action: () => onLogout(),
          },
        ],
      ],
    }),
    [user],
  )

  return {
    isMobileScreen,
    menu,
    onLogout,
    user
  }
}

export default useHeader
