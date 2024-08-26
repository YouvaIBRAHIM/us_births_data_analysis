import {
  fetchAccess,
  fetchCheckAuth,
  fetchLogout,
  fetchRegister,
} from "@src/services/apis/auth.api"
import { create } from "zustand"

import { AuthState } from "@src/types/user.type"

const user = localStorage.getItem("user")

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: user ? JSON.parse(user) : null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  login: async (user) => {
    try {
      const data = await fetchAccess(user)
      localStorage.setItem("token", data.access_token)
    } catch (error) {
      throw new Error(error as string);
    }
  },
  register: async (user) => {
    try {
      const data = await fetchRegister(user)
      set({ user: {
        email : data.email,
        id: data.id,
        first_name : data.first_name,
        last_name : data.last_name,
        is_superuser: data.is_superuser,
        
      } })
      localStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      throw new Error(error as string);
    }
  },
  logout: async () => {
    try {
      await fetchLogout()
      set({ token: null, user: null })
      localStorage.removeItem("user")
      localStorage.removeItem('token');
    } catch (error) {
      console.error("Logout failed:", error)
    }
  },
  initializeAuth: async () => {
    try {
      const data = await fetchCheckAuth()
      set({ user: data })
      localStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      set({ user: null })
    }
  },
}))
