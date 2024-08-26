import {
  AuthCheckResponse,
  ILoginCredentials,
  IUserRegister,
  IValideUserRoles,
  LoginCheckResponse,
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
  const response = await fetch(`${BACKEND_BASE_URL}/v1/users/auth/jwt/login`, {
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

export async function fetchAccess(user: ILoginCredentials): Promise<LoginCheckResponse> {
  const formData = new FormData();
  formData.set('username', user.email);
  formData.set('password', user.password);
  
  const response = await fetch(`${BACKEND_BASE_URL}/v1/users/auth/jwt/login`, {
    method: "POST",
    body: formData,
  })


  const loggedUser = await checkResponse(response) as LoginCheckResponse
  return loggedUser
}

export async function fetchRegister(
  user: IUserRegister,
): Promise<AuthCheckResponse> {

  const response = await fetch(`${BACKEND_BASE_URL}/v1/users/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    }),
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const registeredUser = await checkResponse(response) as AuthCheckResponse
  return  registeredUser 
}

export async function fetchLogout(): Promise<Response> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_BASE_URL}/v1/users/auth/jwt/logout`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  
  return response
}

export async function fetchCheckAuth(): Promise<AuthCheckResponse> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${BACKEND_BASE_URL}/v1/users/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const checkedUser = await response.json()
  return checkedUser
}
