import { Box, Container } from "@mui/system"
import { TOOLBAR_HEIGTH } from "@src/services/constants.service"
import { Outlet } from "react-router-dom"

import Header from "@src/components/Header/Header"
import SideBar from "@src/components/SideBar/SideBar"

function Layout() {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <SideBar />
        <main
          style={{
            width: "100%",
          }}
        >
          <Container
            sx={{
              my: 2,
              maxHeight: {
                xs: "100%",
                sm: `calc(100vh - ${TOOLBAR_HEIGTH}rem)`,
                margin: 0,
              },
            }}
            maxWidth="xxl"
          >
            <Outlet />
          </Container>
        </main>
      </Box>
    </Box>
  )
}

export default Layout
