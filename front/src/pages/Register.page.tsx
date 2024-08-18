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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={theme.palette.mode === 'dark' ? 'logo.png' : 'logo.png'}
            alt='logo'
            loading="lazy"
            height={150}
          />
          <Typography component="h1" variant="h2">
            Inscription
          </Typography>
          <Box component="form" onSubmit={onSubmitRegisteration} sx={{ mt: 1 }}>
            <CustomTextField
              label="Nom"
              variant="outlined"
              value={newUser.lastName}
              onChange={(e) => handleNewUserChange("lastName", e.target.value)}
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
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={isPending}
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
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default RegisterPage
