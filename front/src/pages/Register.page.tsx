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

import { useRegister } from "@src/services/hooks/auth.hooks"

const RegisterPage: React.FC = () => {
  const {
    theme,
    newUser,
    isPending,
    onSubmitRegisteration,
    handleNewUserChange,
    navigate,
  } = useRegister()

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
            Inscription
          </Typography>
          <Stack
            flexDirection="column"
            gap={1}
            width="100%"
          >
            <CustomTextField
              label="Nom"
              variant="outlined"
              value={newUser.last_name}
              onChange={(e) => handleNewUserChange("last_name", e.target.value)}
              required
            />
            <CustomTextField
              label="Prénom"
              variant="outlined"
              value={newUser.first_name}
              onChange={(e) => handleNewUserChange("first_name", e.target.value)}
              required
            />
            <CustomTextField
              label="Email"
              type="email"
              variant="outlined"
              value={newUser.email}
              onChange={(e) => handleNewUserChange("email", e.target.value)}
              required
            />
            <PasswordTextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              value={newUser.password}
              onChange={(e) => handleNewUserChange("password", e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isPending}
              onClick={onSubmitRegisteration} 
            >
              {isPending ? "Inscription en cours..." : "Inscription"}
            </Button>
            <Link
              onClick={() => navigate("/login")}
              variant="body2"
              sx={{ color: theme.palette.mode === 'dark' ? "rgb(192, 192, 192)" : "rgb(25, 25, 25)" }}
            >
              Vous avez déjà un compte ? Connectez-vous
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}

export default RegisterPage
