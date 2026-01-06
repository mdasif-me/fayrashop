export const useLogin = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useRegister = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useVerify = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useVerifyEmail = () => {
  return {
    mutate: (_token: string) => {
      void _token
    },
    isPending: false,
  } as const
}

export const useResend = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useForgotPassword = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useResetPassword = () => {
  return {
    mutate: (_data: unknown) => {
      void _data
    },
    isPending: false,
  } as const
}

export const useUser = () => {
  return {
    data: {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@fayrashop.com',
      phone: '+8801000000000',
    },
    isLoading: false,
  } as const
}

export const useLogout = () => {
  return {
    mutate: () => {},
    isPending: false,
  } as const
}

// export const usePermission = () => {
//   const { data: user } = useUser()

//   return {
//     hasRole: (roles: IUser['role'][]) => {
//       if (!user) return false
//       return roles.includes(user.role)
//     },
//     // permissions field is removed from IUser, so we default to false or remove this
//     hasPermission: (_permission: string) => {
//       return false
//     },
//     user,
//   }
// }
