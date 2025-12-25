import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '../api'
import { apiClient } from '@/lib/api-client'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      apiClient.setToken(data?.token ?? '')
      const { token, ...userDataWithoutToken } = data || {}
      apiClient.setUser(userDataWithoutToken)
      queryClient.setQueryData(['user'], userDataWithoutToken)
      push('/')
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
  })
}

// export const useVerify = () => {
//   const [, setUser] = useCookieStorage<IUser | null>('user', null, {
//     path: '/',
//   })
//   const queryClient = useQueryClient()
//   const { push } = useRouter()

//   return useMutation({
//     mutationFn: authApi.verify,
//     onSuccess: async (data) => {
//       apiClient.setToken(data.access_token)

//       try {
//         const userResponse = await authApi.getUserProfile()
//         const user = userResponse.edge.data
//         setUser(user)
//         queryClient.setQueryData(['user'], user)
//         push('/')
//       } catch (error) {
//         toastManager.add({
//           title: 'Error',
//           description: error as string,
//           type: 'error',
//         })
//         push('/')
//       }
//     },
//   })
// }

export const useResend = () => {
  return useMutation({
    mutationFn: authApi.resend,
  })
}

// export const useUser = () => {
//   return useQuery({
//     queryKey: ['user'],
//     queryFn: authApi.getUserProfile,
//     select: (data) => data.edge.data,
//     retry: false,
//     staleTime: 1000 * 60 * 5,
//   })
// }

// export const useLogout = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()

//   return useMutation({
//     mutationFn: authApi.logout,
//     onSuccess: () => {
//       queryClient.setQueryData(['user'], null)
//       navigate({ to: '/auth/login' })
//     },
//   })
// }

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
