import { IAPIRes } from '../../../interfaces/api-res.interface'
import { IAuthorizationUser, IUser } from './interface'
import {
  ForgetPasswordSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  ResetPasswordSchemaType,
  VerifySchemaType,
} from './schema'

const timestamp = () => new Date().toISOString()

const makeUser = (overrides: Partial<IUser> = {}): IUser => {
  const now = timestamp()
  return {
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@fayrashop.com',
    is_agree: true,
    phone: '+8801000000000',
    photo_id: null,
    image: null,
    status: 'active',
    provider: 'local',
    role: 'customer',
    gender: 'unknown',
    created_at: now,
    updated_at: now,
    deleted_at: null,
    ...overrides,
  }
}

const makeRes = <T>(data?: T | null, message = 'Success'): IAPIRes<T> => {
  return {
    success: true,
    message,
    timestamp: timestamp(),
    data: data ?? null,
  }
}

export const authApi = {
  login: (data: LoginSchemaType) => {
    const authUser: IAuthorizationUser = {
      ...makeUser({ email: data.email }),
      token: 'demo-token',
    }
    return Promise.resolve(makeRes<IAuthorizationUser>(authUser))
  },

  register: (data: RegisterSchemaType) => {
    const { confirm_password, ...rest } = data
    const user = makeUser({
      email: (rest as any).email || 'demo@fayrashop.com',
      name: (rest as any).name || 'Demo User',
    })
    return Promise.resolve(makeRes<IUser>(user, 'Registered successfully'))
  },

  resend: (data: RegisterSchemaType | LoginSchemaType) => {
    return Promise.resolve(makeRes(null, `OTP sent to ${data.email}`))
  },

  // verification using OTP during login process
  verify: (data: VerifySchemaType) => {
    const authUser: IAuthorizationUser = {
      ...makeUser({ email: data.email }),
      token: 'demo-token',
    }
    return Promise.resolve(makeRes<IAuthorizationUser>(authUser, 'Verified successfully'))
  },

  verifyEmail: (token: string) => {
    return Promise.resolve(makeRes(null, `Email verified (${token})`))
  },

  getUserProfile: () => {
    const user = makeUser()
    return Promise.resolve(makeRes<IUser>(user))
  },

  forgotPassword: (data: ForgetPasswordSchemaType) => {
    return Promise.resolve(makeRes(null, `Reset link sent to ${data.email}`))
  },

  resetPassword: (data: ResetPasswordSchemaType) => {
    const payload = {
      token: data.token,
      password: data.newPassword,
    }
    const authUser: IAuthorizationUser = {
      ...makeUser(),
      token: payload.token || 'demo-token',
    }
    return Promise.resolve(makeRes<IAuthorizationUser>(authUser, 'Password reset successful'))
  },

  sendEmail: (data: { recipients: string[]; subject: string; message: string }) => {
    return Promise.resolve(makeRes(null, `Email queued: ${data.subject}`))
  },

  logout: () => {
    return Promise.resolve()
  },
}
