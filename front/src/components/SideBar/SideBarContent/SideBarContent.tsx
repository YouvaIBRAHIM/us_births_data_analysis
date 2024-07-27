import { Box, Divider, List, useTheme } from "@mui/material"

import { ISideBarContent } from "@components/SideBar/SideBarContent/ISideBarContent"
import SideBarListItem from "@components/SideBar/SideBarListItem/SideBarListItem"
import { useColorMode } from "@src/stores/theme.store"
import useIsAuthorized from "@src/services/hooks/useIsAuthorized"
import Switch from "@src/components/Inputs/Switch"

const DrawerContent = ({
  sideBarList,
}: ISideBarContent): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isAuthorized } = useIsAuthorized()
  const theme = useTheme()

  return (
    <>
      {sideBarList && (
        <List>
          {sideBarList.map((sideBarListElement) => (
            <SideBarListItem
              sideBarListElement={sideBarListElement}
              key={sideBarListElement.id}
              isAuthorized={isAuthorized(sideBarListElement.roles)}
            />
          ))}
        </List>
      )}
      <Box
        sx={{
          marginTop: "auto",
        }}
      >
        <Divider />

        <Switch
          label={`Mode ${colorMode === "dark" ? "sombre" : "clair"}`}
          checked={colorMode === "dark" ? true : false}
          action={toggleColorMode}
          background={{
            backgroundImage: {
              notChecked: "/light-icon.svg",
              checked: "/dark-icon.svg",
            },
            backgroundColor:{
              thumb:{
                notChecked: {
                  dark: theme.palette.secondary.main,
                  light: theme.palette.primary.main
                },
                checked: {
                  dark: theme.palette.secondary.main,
                  light: theme.palette.primary.main
                }
              }
            }
          }}
        />
      </Box>
    </>
  )
}
export default DrawerContent
