import { useNavigate } from 'react-router-dom'
import { authClient } from '../../lib/auth-client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSession = () => authClient.useSession() // { data, isPending, error }

export function useEmailLogin() {
  const sendCode = async (email: string) => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({ email, type: 'sign-in' })
    if (error) throw new Error(error.message ?? 'Could not send code')
  }
  const verifyCode = async (email: string, otp: string) => {
    const { error } = await authClient.signIn.emailOtp({ email, otp })
    if (error) throw new Error(error.message ?? 'Invalid code')
  }
  return { sendCode, verifyCode }
}

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = async () => {
    await authClient.signOut()
    queryClient.clear()
    navigate('/login', { replace: true })
  }

  return { logout }
}

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.clear() // drop cached clubs, sessions, etc.
      navigate('/login', { replace: true })
    },
  })
}