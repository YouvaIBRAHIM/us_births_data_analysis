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

import { IPasswords, IProfile, IProfileUpdate } from "@src/types/profile.type"

interface IConfirmationModal {
  title: string
  action: () => void
}
export const useProfile = () => {
  const { showSnackBar } = useSnackBarStore()
  const navigate = useNavigate()

  const [profile, setProfile] = useState<IProfile>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    is_superuser: false
  })

  const [passwords, setPasswords] = useState<IPasswords>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [profileUpdate, setProfileUpdate] = useState<IProfileUpdate>({
    profile: {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      is_superuser: false,
    },
    current_password: "",
  });
  

  const [confirmationModal, setConfirmationModal] =
    useState<IConfirmationModal | null>(null)

  const { user, setUser } = useAuthStore()

  const updateProfileMutation = useMutation({
    mutationFn: (profile: IProfileUpdate) => updateProfile(profile),
    onSuccess: (data) => {
      if (data) {
        const { first_name, last_name, email, is_superuser} = data
        setUser({
          id: user?.id as string,
          first_name: first_name,
          last_name: last_name,
          email,
          is_superuser: is_superuser,
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
    mutationFn: (id: string) => deleteUserAccount(id),
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
    }));

    setProfileUpdate((prev) => ({
      ...prev,
      profile: {
        ...prev?.profile,
        [key]: value,
      },
    }));
    
  }

  const handlePasswordChange = (key: keyof IPasswords, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleCurrentPasswordChange = (value: string) => {
    setProfileUpdate((prev) => ({
      ...prev,
      current_password: value,
    }));
  };

  const handleSubmitProfile = () => {
    if (!profileUpdate) {
      showSnackBar("Les informations de profil sont manquantes", "error");
      return;
    }
    
    setConfirmationModal({
      title: "Confirmez-vous les modifications de votre profil ?",
      action: () => updateProfileMutation.mutate(profileUpdate),
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

  const handleDeleteUserAccount = (id: string) => {
    setConfirmationModal({
      title: "Voulez-vous vraiment supprimer votre compte ?",
      action: () => deleteUserMutation.mutate(id),
    })
  }

  const closeConfirmationModal = () => {
    setConfirmationModal(null)
  }

  useEffect(() => {
    if (user) {
      setProfile({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_superuser: user.is_superuser
      })
    }
  }, [user])
  return {
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
  }
}
