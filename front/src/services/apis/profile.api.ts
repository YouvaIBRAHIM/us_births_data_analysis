import { getCsrfToken } from "@services/apis/auth.api"
import { checkResponse } from "@services/utils.service"

import { IPasswords, IProfile } from "@src/types/profile.type"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const updateProfile = async (profile: IProfile): Promise<IProfile | void> => {
  try {
    const csrfToken = await getCsrfToken()
    const response = await fetch(`${BACKEND_BASE_URL}/api/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || "",
      },
      credentials: "include",
      body: JSON.stringify(profile),
    })
    return (await checkResponse(response)) as IProfile
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const changePassword = async (passwordChange: IPasswords): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken()
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/profile/change-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
        credentials: "include",
        body: JSON.stringify(passwordChange),
      },
    )
    await checkResponse(response)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const deleteUserAccount = async (): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken()
    await fetch(`${BACKEND_BASE_URL}/api/profile/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || "",
      },
      credentials: "include",
    })
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
