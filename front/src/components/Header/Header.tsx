import { useMemo } from "react"

import { Avatar, ListItemIcon, Stack, Theme, useMediaQuery } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Menu from "@components/Menu"
import { SignOut, User } from "@phosphor-icons/react"
import { useAuthStore } from "@src/stores/auth.store"
import { truncateString } from "@src/services/utils.service"
import { useNavigate } from "react-router-dom"
import { TOOLBAR_HEIGTH } from "@src/services/constants.service"

const Header = () => {
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  )

  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const menu = useMemo(
    () => ({
      label: "Menu",
      openIcon: <Avatar sx={{ width: 32, height: 32 }}>{user?.first_name[0].toUpperCase()}</Avatar>,
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
            action: () => logout(),
          },
        ],
      ],
    }),
    [user],
  )

  return (
    <>
      <AppBar>
        <Toolbar>
          <Stack
            width={"100%"}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <img
                src='logo-dark.png'
                alt='GoHub logo'
                loading="lazy"
                style={{
                  height: `${TOOLBAR_HEIGTH}rem`
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography>
                {isMobileScreen
                  ? truncateString(user?.first_name ?? "", 20)
                  : user?.first_name}
              </Typography>
              <Menu {...menu} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default Header
