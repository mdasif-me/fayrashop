export const useAddresses = () => {
  return {
    data: [
      {
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
      },
    ],
    isLoading: false,
  } as const
}

export const useUpdateProfile = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useUpdatePhoto = () => {
  return {
    mutate: (_photoId: string) => {
      void _photoId
    },
    isPending: false,
  } as const
}

export const useUploadAsset = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useSaveAddress = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useDeleteAddress = () => {
  return {
    mutate: (_id: string) => {
      void _id
    },
    isPending: false,
  } as const
}

export const useDeleteAccount = () => {
  return {
    mutate: (_id: string) => {
      void _id
    },
    isPending: false,
  } as const
}

export const useChangePassword = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}
