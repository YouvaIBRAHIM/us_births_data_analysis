import { Stack } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Menu from "@components/Menu"
import { truncateString } from "@src/services/utils.service"
import { TOOLBAR_HEIGTH } from "@src/services/constants.service"
import useHeader from "@components/Header/Header.hook"

const Header = () => {
  const {
    isMobileScreen,
    menu,
    user
  } = useHeader()

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
                src='logo.png'
                alt='logo'
                loading="lazy"
                style={{
                  height: `${TOOLBAR_HEIGTH - 1}rem`
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
