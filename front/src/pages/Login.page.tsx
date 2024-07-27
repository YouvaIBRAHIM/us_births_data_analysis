import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
} from "@mui/material"
import PasswordTextField from "@src/components/Inputs/PasswordTextField"
import CustomTextField from "@src/components/Inputs/TextField"

import { useLogin } from "@src/services/hooks/auth.hooks"

const LoginPage = () => {
  const {
    theme,
    credentials,
    isPending,
    onSubmitLogin,
    handleCredentialsChange,
    navigate,
  } = useLogin()


  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={theme.palette.mode === 'dark' ? 'logo-dark.png' : 'logo-light.png'}
            alt='GoHub logo'
            loading="lazy"
            height={150}
          />
          <Typography component="h1" variant="h2">
            Connexion
          </Typography>
          <Box component="form" onSubmit={onSubmitLogin} sx={{ mt: 1 }}>
            <CustomTextField
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) => handleCredentialsChange('email', e.target.value)}
              required
            />
            <PasswordTextField
              label="Mot de passe"
              type="password"
              value={credentials.password}
              onChange={(e) => handleCredentialsChange('password', e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isPending}
            >
              {isPending ? "Connexion en cours..." : "Connexion"}
            </Button>
            <Link
              onClick={() => navigate("/register")}
              variant="body2"
              sx={{ color: theme.palette.mode === 'dark' ? "rgb(192, 192, 192)" : "rgb(25, 25, 25)" }}
            >
              Vous n'avez pas de compte ? Inscrivez-vous
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
