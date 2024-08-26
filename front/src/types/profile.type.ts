export interface IProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
}

export interface IPasswords {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface IProfileUpdate{
  profile: IProfile
  current_password: string
}
