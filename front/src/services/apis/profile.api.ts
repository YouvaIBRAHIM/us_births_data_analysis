import { getCsrfToken } from "@services/apis/auth.api"
import { checkResponse } from "@services/utils.service"

import { IPasswords, IProfile, IProfileUpdate } from "@src/types/profile.type"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const updateProfile = async (profile: IProfileUpdate): Promise<IProfile| void> => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/v1/users/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: profile.profile.email,
        first_name: profile.profile.first_name,
        last_name: profile.profile.last_name,
        password: profile.current_password
      }),
    })

    return (await checkResponse(response)) as IProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const changePassword = async (passwordChange: IPasswords): Promise<void> => {
  const token = localStorage.getItem("token")
  try {
    await fetch(
      `${BACKEND_BASE_URL}/v1/users/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(passwordChange),
      },
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during password change:", error.message);
      throw new Error(error.message)
    }
  }
}

export const deleteUserAccount = async (): Promise<void> => {
  const token = localStorage.getItem('token');

  try {
    await fetch(`${BACKEND_BASE_URL}/v1/users/me`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
