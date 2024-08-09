import { useEffect, useState } from "react"

import {
  changePassword,
  deleteUserAccount,
  updateProfile,
} from "@services/apis/profile.api"
import { useAuthStore } from "@src/stores/auth.store"
import { useSnackBarStore } from "@src/stores/snackbar.store"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { IPasswords, IProfile } from "@src/types/profile.type"

interface IConfirmationModal {
  title: string
  action: () => void
}
export const useProfile = () => {
  const { showSnackBar } = useSnackBarStore()
  const navigate = useNavigate()

  const [profile, setProfile] = useState<IProfile>({
    // username: "",
    first_name: "",
    last_name: "",
    email: "",
  })

  const [passwords, setPasswords] = useState<IPasswords>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [confirmationModal, setConfirmationModal] =
    useState<IConfirmationModal | null>(null)

  const { user, setUser } = useAuthStore()

  const updateProfileMutation = useMutation({
    mutationFn: (profile: IProfile) => updateProfile(profile),
    onSuccess: (data) => {
      if (data) {
        const { first_name, last_name, email } = data
        setUser({
          id: user?.id as number,
          firstName: first_name,
          lastName: last_name,
          email,
        })
      }
      setConfirmationModal(null)
      showSnackBar("Vos informations personnelles ont été mises à jour", "success")
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: (passwordChange: IPasswords) => changePassword(passwordChange),
    onSuccess: () => {
      setConfirmationModal(null)
      showSnackBar("Votre mot de passe a été mis à jour", "success")
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUserAccount(),
    onSuccess: () => {
      setConfirmationModal(null)
      setUser(null)
      showSnackBar("Votre compte a été supprimé", "success")
      navigate("/login")
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const handleProfileChange = (key: keyof IProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePasswordChange = (key: keyof IPasswords, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmitProfile = () => {
    setConfirmationModal({
      title: "Confirmez-vous les modifications de votre profil ?",
      action: () => updateProfileMutation.mutate(profile),
    })
  }

  const handleSubmitPasswordChange = () => {
    if (passwords.new_password !== passwords.confirm_password) {
      showSnackBar("Les nouveaux mots de passe ne correspondent pas", "warning")
      return
    }
    setConfirmationModal({
      title: "Confirmez-vous les modifications de votre mot de passe ?",
      action: () => changePasswordMutation.mutate(passwords),
    })
  }

  const handleDeleteUserAccount = () => {
    setConfirmationModal({
      title: "Voulez-vous vraiment supprimer votre compte ?",
      action: () => deleteUserMutation.mutate(),
    })
  }

  const closeConfirmationModal = () => {
    setConfirmationModal(null)
  }

  useEffect(() => {
    if (user) {
      setProfile({
        // username: username,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
      })
    }
  }, [user])
  return {
    profile,
    passwords,
    handleProfileChange,
    handlePasswordChange,
    handleSubmitProfile,
    handleSubmitPasswordChange,
    handleDeleteUserAccount,
    confirmationModal,
    closeConfirmationModal,
  }
}
