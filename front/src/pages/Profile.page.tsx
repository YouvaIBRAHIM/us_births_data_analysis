import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"

import ConfirmationModal from "@components/ConfirmationModal"
import { useProfile } from "@services/hooks/profile.hook"
import { useAuthStore } from "@src/stores/auth.store"

import {
  UserProfileCardSkeleton,
  UserProfileFormSkeleton,
  UserProfilePasswordFormSkeleton,
} from "@src/components/Skeletons/UserProfileSkeletons"
import CustomTextField from "@src/components/Inputs/TextField"
import PasswordTextField from "@src/components/Inputs/PasswordTextField"

const Profile = () => {
  const {
    profile,
    passwords,
    handleProfileChange,
    handlePasswordChange,
    handleCurrentPasswordChange,
    handleSubmitProfile,
    handleSubmitPasswordChange,
    handleDeleteUserAccount,
    confirmationModal,
    closeConfirmationModal,
  } = useProfile()

  const { user } = useAuthStore()

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ position: "sticky", top: 0 }}>
            {user ? (
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar sx={{ width: 120, height: 120, margin: "auto" }} />
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                  {user?.first_name}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginTop: 2 }}
                  onClick={()=>handleDeleteUserAccount()}
                >
                  Supprimer mon compte
                </Button>
              </CardContent>
            ) : (
              <UserProfileCardSkeleton />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            {user ? (
              <CardContent>
                <Typography variant="h6">
                  Mettre à jour les informations personnelles
                </Typography>
                <CustomTextField
                  label="Prénom"
                  name="first_name"
                  value={profile.first_name}
                  onChange={(e) => handleProfileChange("first_name", e.target.value)}
                />
                <CustomTextField
                  label="Nom"
                  name="last_name"
                  value={profile.last_name}
                  onChange={(e) => handleProfileChange("last_name", e.target.value)}
                />
                <CustomTextField
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
                <PasswordTextField
                  label="Mot de passe"
                  type="password"
                  name="current_password"
                  onChange={(e)=>handleCurrentPasswordChange(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={handleSubmitProfile}
                >
                  Mettre à jour
                </Button>
              </CardContent>
            ) : (
              <UserProfileFormSkeleton />
            )}
          </Card>
          <Card sx={{ marginTop: 4 }}>
            {user ? (
              <CardContent>
                <Typography variant="h6">Changer le mot de passe</Typography>
                <PasswordTextField
                  label="Mot de passe actuel"
                  type="password"
                  name="currentPassword"
                  value={passwords.current_password}
                  onChange={(e) =>
                    handlePasswordChange("current_password", e.target.value)
                  }
                />
                <PasswordTextField
                  label="Nouveau mot de passe"
                  type="password"
                  name="newPassword"
                  value={passwords.new_password}
                  onChange={(e) =>
                    handlePasswordChange("new_password", e.target.value)
                  }
                />
                <PasswordTextField
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirm_password}
                  onChange={(e) =>
                    handlePasswordChange("confirm_password", e.target.value)
                  }
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  onClick={handleSubmitPasswordChange}
                >
                  Changer le mot de passe
                </Button>
              </CardContent>
            ) : (
              <UserProfilePasswordFormSkeleton />
            )}
          </Card>
        </Grid>
      </Grid>
      {confirmationModal && (
        <ConfirmationModal
          open={Boolean(confirmationModal)}
          title={confirmationModal.title}
          onConfirmation={confirmationModal.action}
          onCancelation={() => closeConfirmationModal()}
        />
      )}
    </Box>
  )
}

export default Profile
