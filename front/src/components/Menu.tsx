import { MouseEvent, ReactNode, useState } from "react"

import { Box, styled } from "@mui/material"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Tooltip from "@mui/material/Tooltip"

interface MenuOption {
  label: string
  icon: ReactNode
  action: () => void
}

interface IMenu {
  label: string
  openIcon: ReactNode
  options: MenuOption[][]
}

const CustomMenu = ({ label, openIcon, options }: IMenu) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title={label}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {openIcon}
        </IconButton>
      </Tooltip>
      <StyledMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: {
              xs: "100%",
              sm: "auto",
            },
            minWidth: 250,
          },
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((part, index) => (
          <Box key={index}>
            {part.map((option, optionIndex) => (
              <MenuItem key={(index + 1) * optionIndex} onClick={option.action}>
                {option.icon}
                {option.label}
              </MenuItem>
            ))}
            {index + 1 < options.length && <Divider />}
          </Box>
        ))}
      </StyledMenu>
    </>
  )
}

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiPaper-root::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
}))

export default CustomMenu
