import { ReactElement } from "react"

import Tooltip, { TooltipProps } from "@mui/material/Tooltip"

const ArrowTooltips = ({
  title = "",
  placement = "right",
  disableHoverListener = false,
  labelMaxLength = 20,
  children,
}: {
  title: string
  placement?: TooltipProps["placement"]
  disableHoverListener?: boolean
  labelMaxLength?: number
  children: ReactElement
}) => {
  return (
    <Tooltip
      disableHoverListener={
        disableHoverListener == false
          ? false
          : title.length > labelMaxLength
            ? false
            : true
      }
      title={title}
      arrow
      placement={placement}
    >
      {children}
    </Tooltip>
  )
}
export default ArrowTooltips
