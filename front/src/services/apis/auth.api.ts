import {
  AuthCheckResponse,
  IUserRegister,
  IValideUserRoles,
} from "@src/types/user.type"
import { checkResponse } from "@services/utils.service"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user: { role: IValideUserRoles[] }
}

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${BACKEND_BASE_URL}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return await response.json()
}

export async function getCsrfToken(): Promise<string | null> {
  try {
    const csrfResponse = await fetch(`${BACKEND_BASE_URL}/api/csrf-token/`, {
      credentials: "include",
    })
    const csrfData = await csrfResponse.json()
    return csrfData.csrfToken
  } catch (error) {
    return null
  }
}

export async function fetchAccess(credentials: {  
  email: string,
  password: string
}): Promise<AuthCheckResponse> {
  const csrfToken = await getCsrfToken()
  const {email, password} = credentials
  
  const response = await fetch(`${BACKEND_BASE_URL}/api/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })


  const { user: loggedUser } = await checkResponse(response) as AuthCheckResponse
  return { user: loggedUser }
}

export async function fetchRegister(
  user: IUserRegister,
): Promise<AuthCheckResponse> {
  const csrfToken = await getCsrfToken()

  const response = await fetch(`${BACKEND_BASE_URL}/api/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
    },
    body: JSON.stringify(user),
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const { user: registeredUser } = await checkResponse(response) as AuthCheckResponse
  return { user: registeredUser }
}

export async function fetchLogout(): Promise<Response> {
  const csrfToken = await getCsrfToken()

  const response = await fetch(`${BACKEND_BASE_URL}/api/logout/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken || "",
    },
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response
}

export async function fetchCheckAuth(): Promise<AuthCheckResponse> {
  const response = await fetch(`${BACKEND_BASE_URL}/api/check-auth/`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const { user: checkedUser } = await response.json()
  return { user: checkedUser }
}
