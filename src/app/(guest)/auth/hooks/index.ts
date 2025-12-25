import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '../api'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'
import { IAPIRes } from '@/interfaces/api-res.interface'
import { IAuthorizationUser } from '../interface'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      if (data?.message) {
        // User needs verification
        apiClient.setTempAuth({
          email: data.email,
          isLogin: true,
          userData: data,
        })
        toast.info('Info', {
          description: 'Please verify your email with OTP',
        })
        push('/auth?mode=verify')
      } else {
        // User verified, complete login
        apiClient.setToken(data?.token ?? '')
        const { token, ...userDataWithoutToken } = data || {}
        apiClient.setUser(userDataWithoutToken)
        queryClient.setQueryData(['user'], userDataWithoutToken)
        toast.success('Success', {
          description: 'Logged in successfully',
        })
        push('/')
      }
    },
    onError: (error) => {
      toast.error('Error', {
        description: error.message,
      })
    },
  })
}

export const useRegister = () => {
  const { push } = useRouter()
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      // Store registration data for OTP verification
      apiClient.setTempAuth({
        email: (data.data as any).email,
        isRegister: true,
        userData: data.data,
      })
      toast.info('Info', {
        description: 'Please verify your email with OTP',
      })
      push('/auth?mode=verify')
    },
    onError: (error) => {
      toast.error('Error', {
        description: error.message,
      })
    },
  })
}

export const useVerify = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()

  return useMutation({
    mutationFn: authApi.verify,
    onSuccess: (response: IAPIRes<IAuthorizationUser>) => {
      const authData = response?.data
      if (!authData) {
        toast.error('Error', {
          description: 'Invalid response from server',
        })
        return
      }

      apiClient.removeTempAuth()
      apiClient.setToken(authData.token ?? '')
      const { token, ...userDataWithoutToken } = authData
      apiClient.setUser(userDataWithoutToken)
      queryClient.setQueryData(['user'], userDataWithoutToken)

      toast.success('Success', {
        description: 'Email verified successfully',
      })
      push('/')
    },
    onError: (error) => {
      toast.error('Error', {
        description: error.message,
      })
    },
  })
}

export const useResend = () => {
  return useMutation({
    mutationFn: authApi.resend,
    onSuccess: () => {
      toast.success('Success', {
        description: 'OTP sent to your email',
      })
    },
    onError: (error) => {
      toast.error('Error', {
        description: error.message,
      })
    },
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
