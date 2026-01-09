import { IAPIRes } from '@/interfaces/api-res.interface'
import { IAddress, IAsset } from '@/interfaces/user.interface'
import { IUser } from '../(guest)/auth/interface'

const timestamp = () => new Date().toISOString()

const makeRes = <T>(data?: T | null, message = 'Success'): IAPIRes<T> => {
  return {
    success: true,
    message,
    timestamp: timestamp(),
    data: data ?? null,
  }
}

const demoAddress = (): IAddress => {
  return {
    id: 'demo-address',
    first_name: 'Demo',
    last_name: 'Customer',
    company_name: null,
    address: '123 Demo Street',
    country: 'Bangladesh',
    state: 'Dhaka',
    city: 'Dhaka',
    zip_code: '1207',
    email: 'demo@fayrashop.com',
    phone_number: '+8801000000000',
    type: 'billing',
    created_at: timestamp(),
    updated_at: timestamp(),
  }
}

export const userApi = {
  getUserProfile: () => {
    const user: IUser = {
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
      created_at: timestamp(),
      updated_at: timestamp(),
      deleted_at: null,
    }
    return Promise.resolve(makeRes<IUser>(user))
  },

  updateProfile: (id: string, data: Partial<IUser>) => {
    const updated = { id, ...data } as IUser
    return Promise.resolve(makeRes<IUser>(updated, 'Profile updated'))
  },

  updatePhoto: (photoId: string) => {
    const updated = { id: 'demo-user', photo_id: photoId } as IUser
    return Promise.resolve(makeRes<IUser>(updated, 'Photo updated'))
  },

  uploadAsset: (formData: FormData) => {
    const now = timestamp()
    const asset: IAsset = {
      id: 'demo-asset',
      public_id: 'demo-public-id',
      secure_url: 'https://placehold.co/600x600/png',
      format: 'png',
      width: 600,
      height: 600,
      size: 0,
      asset_type: 'image',
      purpose: 'profile',
      owner_type: null,
      owner_id: null,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    }
    void formData
    return Promise.resolve(makeRes<IAsset>(asset, 'Uploaded'))
  },

  getAddresses: () => {
    return Promise.resolve(makeRes<IAddress[]>([demoAddress()]))
  },

  getAddress: (id: string) => {
    return Promise.resolve(makeRes<IAddress>({ ...demoAddress(), id }))
  },

  saveAddress: (method: 'POST' | 'PATCH', data: Partial<IAddress>, id?: string) => {
    const base = demoAddress()
    const saved = {
      ...base,
      ...(method === 'PATCH' && id ? { id } : {}),
      ...data,
      updated_at: timestamp(),
    } as IAddress
    return Promise.resolve(makeRes<IAddress>(saved, 'Address saved'))
  },

  deleteAddress: (id: string) => {
    return Promise.resolve(makeRes(null, `Address deleted (${id})`))
  },

  deleteAccount: (id: string) => {
    return Promise.resolve(makeRes(null, `Account deleted (${id})`))
  },

  changePassword: (data: any) => {
    void data
    return Promise.resolve(makeRes(null, 'Password changed'))
  },
}
