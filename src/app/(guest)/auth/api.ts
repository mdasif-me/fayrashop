import { IAPIRes } from '../../../interfaces/api-res.interface'
import { apiClient } from '../../../lib/api-client'
import { IAuthorizationUser, IUser } from './interface'
import { LoginSchemaType, RegisterSchemaType, VerifySchemaType } from './schema'

export const authApi = {
  login: (data: LoginSchemaType) => {
    return apiClient.post<IAPIRes<IAuthorizationUser>>('/auth/login', data)
  },

  register: (data: RegisterSchemaType) => {
    return apiClient.post<IAPIRes<IUser>>('/auth/register', data)
  },

  resend: (data: RegisterSchemaType | LoginSchemaType) => {
    return apiClient.post<IAPIRes>('/users/request-otp', data)
  },

  verify: (data: VerifySchemaType) => {
    return apiClient.post<IAPIRes<IUser>>('/auth/login', data)
  },

  getUserProfile: () => {
    return apiClient.get<IAPIRes<IUser>>('/users/profile')
  },

  logout: () => {
    /**
     * if server side invalidation exists
     * return apiClient.post('/auth/logout', {})
     */

    apiClient.removeToken()
    return Promise.resolve()
  },
}
