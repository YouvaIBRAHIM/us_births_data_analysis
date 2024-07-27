import { ListItem, ListItemButton, ListItemIcon, ListItemText, alpha, useTheme } from "@mui/material"

import ArrowTooltips from "@components/ArrowTooltips"
import { ISideBarListItem } from "@components/SideBar/SideBarListItem/ISideBarListItem"
import { sideBarConst } from "@services/constants.service"
import { truncateString } from "@services/utils.service"
import { useSideBar } from "@src/stores/sidebar.store"
import { NavLink } from "react-router-dom"

const SideBarListItem = ({
  sideBarListElement,
  isAuthorized,
}: {
  sideBarListElement: ISideBarListItem
  isAuthorized: boolean
}) => {
  const { isOpen } = useSideBar()
  const theme = useTheme();

  const onHandleClick = () => {
    if (sideBarListElement?.action) {
      sideBarListElement.action()
    }
  }
  const renderListItem = () => {
    return (
      <ListItem
        key={sideBarListElement.id}
        disablePadding
        sx={{ 
          display: isAuthorized ? "block" : "none",
        }}
        onClick={onHandleClick}
      >
        <ListItemButton
          sx={{
            justifyContent: isOpen ? "initial" : "center",
            ".active &": {
              backgroundColor: theme.palette.primary.light,
            }
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {sideBarListElement.icon}
          </ListItemIcon>
          <ListItemText
            primary={truncateString(
              sideBarListElement.label,
              sideBarConst.labelMaxLength,
            )}
            sx={{ opacity: isOpen ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    )
  }
  return (
    <ArrowTooltips
      title={sideBarListElement.label}
      labelMaxLength={sideBarConst.labelMaxLength}
      disableHoverListener={isOpen}
    >
      {
        sideBarListElement?.link 
        ?
        <NavLink
          to={sideBarListElement.link}
          className={({isActive}) => isActive ? 'active' : ''}
          style={({isActive}) => ({
            textDecoration: 'none',
            color: isActive ? theme.palette.getContrastText(theme.palette.primary.main) : theme.palette.text.primary
          })}
        >
          {renderListItem()}
        </NavLink>
        :
        renderListItem()
      }
      
    </ArrowTooltips>
  )
}

export default SideBarListItem
