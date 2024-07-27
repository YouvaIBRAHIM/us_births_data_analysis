import { MouseEvent, useState } from "react"

import Popover, { PopoverOrigin } from "@mui/material/Popover"
import Typography, { TypographyOwnProps } from "@mui/material/Typography"

import { StandardCSSProperties } from "@mui/system"

interface IProps {
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  bgColor?: StandardCSSProperties["backgroundColor"]
  color?: TypographyOwnProps["color"]
}
const initProps: IProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  color: "whitesmoke",
  bgColor: "primary.dark",
}
export default function usePopover({
  anchorOrigin = initProps.anchorOrigin!,
  transformOrigin = initProps.transformOrigin!,
  color = initProps.color!,
  bgColor = initProps.bgColor!,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [text, setText] = useState("")

  const handlePopoverOpen = (
    event: MouseEvent<HTMLElement>,
    description: string,
  ) => {
    setAnchorEl(event.currentTarget)
    setText(description)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
    setText("")
  }

  const open = Boolean(anchorEl)

  return {
    handlePopoverOpen,
    handlePopoverClose,
    PopOver: (
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          ".MuiPopover-paper": {
            backgroundColor: bgColor,
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: anchorOrigin.vertical,
          horizontal: anchorOrigin.horizontal,
        }}
        transformOrigin={{
          vertical: transformOrigin.vertical,
          horizontal: transformOrigin.horizontal,
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }} color={color}>
          {text}
        </Typography>
      </Popover>
    ),
  }
}
