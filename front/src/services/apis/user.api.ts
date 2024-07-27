import { getCsrfToken } from "@services/apis/auth.api"

import { IRole, IUser, IUserList, IUserSearch } from "@src/types/user.type"

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const getUsers = async (
  page: number,
  perPage: number,
  search: IUserSearch,
): Promise<IUserList> => {
  try {
    const response = await fetch(
      `${BACKEND_BASE_URL}/api/users/?format=json&page=${page}&perPage=${perPage}&role=${search.role}&searchBy=${search.searchBy}&searchValue=${search.value}`,
      {
        credentials: "include",
      },
    )
    const data = await response.json()

    return {
      count: data.count,
      data: data.results,
    } as IUserList
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer.",
    )
  }
}

export const updateUserRole = async (userId: string, roles: IRole["role"][]) => {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${BACKEND_BASE_URL}/api/users/update/roles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || "",
      },
      body: JSON.stringify({ user_id: userId, roles }),
      credentials: "include",
    })
    return await response.json()
  } catch {
    throw new Error(
      "Une erreur est survenue lors de la modification de l'utilisateur. Veuillez réessayer.",
    )
  }
}

export const getUser = async (id: string) => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/users/${id}`, {
      credentials: "include",
    })
    return await response.json()
  } catch {
    throw new Error(
      "Une erreur est survenue lors du chargement de l'utilisateur. Veuillez réessayer.",
    )
  }
}

export async function updateUser(user: IUser) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      credentials: "include",
    })
    return await response.json()
  } catch {
    throw new Error(
      "Une erreur est survenue lors de la modification de l'utilisateur. Veuillez réessayer.",
    )
  }
}

export async function deleteUser(id: string) {
  try {
    const csrfToken = await getCsrfToken()

    const response = await fetch(`${BACKEND_BASE_URL}/api/users/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken || "",
      },
      credentials: "include",
    })
    return response
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez réessayer.",
    )
  }
}
