import { EAuthProvider, EGender, ERole, EStatus } from '../enum'

export interface IUser {
  id: string
  name: string
  email: string
  is_agree: boolean
  phone: string | null
  photo_id: string | null
  image?: string | null
  status: 'unverified' | 'active' | 'inactive' | 'suspended' | string // generalized for safety
  provider: 'local' | 'google' | 'facebook' | string
  role: 'customer' | 'admin' | string
  gender: 'male' | 'female' | 'other' | 'unknown' | string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface IAuthorizationUser extends IUser {
  token: string
  message?: string
}
