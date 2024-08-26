import { getCsrfToken } from "@services/apis/auth.api"
import { checkResponse } from "@services/utils.service"

import { IPasswords, IProfile, IProfileUpdate } from "@src/types/profile.type"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const updateProfile = async (profile: IProfileUpdate): Promise<IProfile| void> => {
  const token = localStorage.getItem('token');
  const apiUrl = `${BACKEND_BASE_URL}/v1/users/users/me`;
  console.log("API URL:", apiUrl);
  console.log("Token:", token);
  console.log("Profile Update Data:", profile);

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/v1/users/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        email: profile.profile.email,
        first_name: profile.profile.first_name,
        last_name: profile.profile.last_name,
        password: profile.current_password
      }),
    })

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    return (await checkResponse(response)) as IProfile
  } catch (error) {
    console.error("Error in updateProfile:", error);
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const changePassword = async (passwordChange: IPasswords): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken()
    const response = await fetch(
      `${BACKEND_BASE_URL}/v1/users/auth/reset-password`,
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

export const deleteUserAccount = async (id: string): Promise<void> => {
  const token = localStorage.getItem('token');

  try {
    await fetch(`${BACKEND_BASE_URL}/v1/users/users/${id}`, {
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
