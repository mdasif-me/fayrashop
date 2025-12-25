import { EAuthProvider, EGender, ERole, EStatus } from '../enum'

export interface IUser {
  id: string
  name: string
  email: string
  is_agree: boolean
  phone: string | null
  photo_id: string | null
  status: EStatus
  provider: EAuthProvider
  role: ERole
  gender: EGender
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface IAuthorizationUser extends IUser {
  token: string
}
