import { Box, Button, Paper, Stack, Typography, styled, useTheme } from "@mui/material"

import { NavLink } from "react-router-dom"

const NotFoundView = () => {
  const theme = useTheme()

  return (
    <Stack
      direction="column"
      gap={4}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        minHeight: "50vh",
      }}
    >
      <Background>
        <Typography sx={{
          color: theme.palette.getContrastText('#ffffff'),
          fontWeight: 900
        }} variant="h1">404</Typography>
      </Background>

      <Stack
        direction="column"
        gap={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
        }}
      >
        <Typography variant="h2">
          Vous avez l'air perdu
        </Typography>
        <Typography component="p" variant="h3">
          La page que vous cherchez n'existe pas
        </Typography>
        <NavLink
          to="/"
          style={{
            textDecoration: "none"
          }}
        >
          <Button variant='contained'>
            Page d'accueil
          </Button>
        </NavLink>
      </Stack>
    </Stack>
  )
}

const Background = styled(Paper)({
  backgroundImage:
    "url(404.gif)",
  height: "400px",
  width: '100%',
  backgroundPosition: "center",
})

export default NotFoundView
