import { styled } from "@mui/material/styles"

import { Button } from "@mui/material"
import Box from "@mui/material/Box"

import { useSideBar } from "@src/stores/sidebar.store"

const OpenButtonSideBar = () => {
  const { isOpen, toggleOpenSideBar } = useSideBar()

  return (
    <ArrowButton disableRipple onClick={toggleOpenSideBar}>
      <Box className={`arrowIcon ${!isOpen && "open"}`}>
        <Box className="leftBar"></Box>
        <Box className="rightBar"></Box>
      </Box>
    </ArrowButton>
  )
}

const ArrowButton = styled(Button)(
  ({ theme }) => `
    padding: 0;
    position: fixed;
    min-width: 40px;
    .arrowIcon {
        height: 40px;
        width: 40px;
        display: block;
        position: relative;
        cursor: pointer;
        border-radius: 4px;
        transform: rotate(90deg);
        display: flex;
        align-items: center;
        justify-items: center;
    }
    .leftBar {
        position: relative;
        background-color: transparent;
        top: 0;
        left: 3px;
        width: 20px;
        height: 5px;
        display: block;
        transform: rotate(35deg);
        float: right;
        border-radius: 2px;
    }
    .leftBar:after {
        content: '';
        background-color: ${theme.palette.mode === "dark" ? theme.palette.grey[400] : theme.palette.grey[700]};
        width: 20px;
        height: 5px;
        display: block;
        float: right;
        border-radius: 10px;
        transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
        z-index: -1;
    }
    .rightBar {
        position: relative;
        background-color: transparent;
        top: 0px;
        left: -3px;
        width: 20px;
        height: 5px;
        display: block;
        transform: rotate(-35deg);
        float: right;
        border-radius: 2px;
    }
    .rightBar:after {
        content: '';
        background-color: ${theme.palette.mode === "dark" ? theme.palette.grey[400] : theme.palette.grey[700]};
        width: 20px;
        height: 5px;
        display: block;
        float: right;
        border-radius: 10px;
        transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
        z-index: -1;
    }
    .open .leftBar:after {
        transform-origin: center center;
        transform: rotate(-70deg);
    }
    .open .rightBar:after {
        transform-origin: center center;
        transform: rotate(70deg);
    }
`,
)
export default OpenButtonSideBar
