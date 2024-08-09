export interface IUser {
  id: string
  first_name: string
  last_name: string
  email: string
  roles: IValideUserRoles[],
  score: number
}

export interface IRole {
  role: "all" | "admin" | "editor" | "player"
}

export type IValideUserRoles = Exclude<IRole["role"], "all">

export interface IUserSearch {
  value: string
  searchBy: "name" | "email"
  orderBy: "name" | "email"
  role: IRole["role"]
  order: "asc" | "desc"
}

export interface IUserList {
  data: IUser[]
  count: number
}

export interface AuthCheckResponse {

    //username: string
    email: string
    //roles: IValideUserRoles[]
    firstName: string
    lastName: string
    id: number,
    //score: number
}

export interface LoginCheckResponse {
  access_token: string
}

export interface ILoginCredentials{
  email: string,
  password: string,
}

export interface AuthState {
  token: string | null
  user: AuthCheckResponse | null
  setToken: (token: string | null) => void
  setUser: (user: AuthCheckResponse | null) => void
  login: (credentials: ILoginCredentials) => Promise<void>
  register: (user: IUserRegister) => Promise<void>
  logout: () => Promise<void>
  initializeAuth: () => Promise<void>
}

export interface IUserRegister {
  firstName: string
  lastName: string
  email: string
  password: string
}
