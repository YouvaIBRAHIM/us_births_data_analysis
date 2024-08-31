import {
  Button,
  Container,
  Link,
  Paper,
  Stack,
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
        <Stack
          flexDirection="column"
          alignItems="center"
          gap={2}
          width="100%"
        >
          <img
            src={theme.palette.mode === 'dark' ? 'logo.png' : 'logo.png'}
            alt='logo'
            loading="lazy"
            height={150}
            width={150}
          />
          <Typography component="h1" variant="h2">
            Connexion
          </Typography>
          <Stack 
            flexDirection="column"
            gap={1}
            width="100%"
          >
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
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isPending}
              onClick={onSubmitLogin}
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
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export default LoginPage
