import { useTheme } from "@mui/material"
import { useAuthStore } from "@src/stores/auth.store"
import { useSnackBarStore } from "@src/stores/snackbar.store"
import { ILoginCredentials, IUserRegister } from "@src/types/user.type"
import { useMutation } from "@tanstack/react-query"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

//login hook
export const useLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const {login, initializeAuth} = useAuthStore()
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackBar } = useSnackBarStore()

  const {mutate: onLogin, isPending} = useMutation({
    mutationFn: (credentials: ILoginCredentials) => login(credentials),
    onSuccess: async () => {
      if (await initializeAuth()) {
        navigate("/")
      }
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const handleCredentialsChange = (key: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onSubmitLogin = (event: FormEvent) => {
    event.preventDefault()
    onLogin(credentials)
  }

  return {
    theme,
    credentials,
    isPending,
    onSubmitLogin,
    handleCredentialsChange,
    navigate,
    onLogin
  }
}


// register hook
export const useRegister = () => {
  const [newUser, setNewUser] = useState<IUserRegister>({
    first_name: "",
    lastName: "",
    email: "",
    password: "",
  })

  const { register } = useAuthStore()
  const { onLogin } = useLogin()
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackBar } = useSnackBarStore()

  const {mutate: onRegisteration, isPending} = useMutation({
    mutationFn: () => register(newUser),
    onSuccess: () => {
      onLogin({
        email: newUser.email,
        password: newUser.password,
      })
    },
    onError: (error) => {
      showSnackBar(error.message, "error")
    },
  })

  const handleNewUserChange = (key: string, value: string) => {
    setNewUser((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const onSubmitRegisteration = (event: FormEvent) => {
    event.preventDefault()
    onRegisteration()
  }

  return {
    theme,
    newUser,
    isPending,
    onSubmitRegisteration,
    handleNewUserChange,
    navigate,
  }
}
