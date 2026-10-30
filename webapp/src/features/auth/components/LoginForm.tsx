import { useState } from 'react'
import { useEmailLogin } from '../hooks'
import { Button } from '../../../components/ui/button'
import { authClient } from '../../../lib/auth-client'
import { InputOTP, InputOTPGroup, InputOTPSlot  } from '../../../components/ui/input-otp'
import { Input } from '../../../components/ui/input'

const LoginForm = () => {
  const { sendCode, verifyCode } = useEmailLogin()
  const [step, setStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const run = async (fn: () => Promise<void>) => {
    setBusy(true)
    setError(null)
    try {
      await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    run(async () => {
      await sendCode(email.trim())
      setStep('code')
    })
  }

  const submitCode = (code: string) =>
    run(async () => {
      await verifyCode(email.trim(), code)
      // no navigate: the session updates and the /login guard redirects
    }).then(() => setOtp(''))

  const social = (provider: 'google' | 'line') =>
    authClient.signIn.social({ provider, callbackURL: '/organiser' })

  return (
    <div className="neon-card w-full max-w-sm space-y-5 p-6">
      <h1 className="font-display text-2xl text-white">Sign in to DinkQ</h1>

      {step === 'email' ? (
        <form onSubmit={submitEmail} className="space-y-3">
          <Input
            type="email"
            required
            autoFocus
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={busy || !email}>
            {busy ? 'Sending…' : 'Email me a code'}
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Enter the 6-digit code sent to <span className="text-white">{email}</span>
          </p>
          <InputOTP maxLength={6} value={otp} onChange={setOtp} onComplete={submitCode} disabled={busy}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="flex justify-between text-sm">
            <button
              type="button"
              className="text-ink-muted hover:text-white"
              onClick={() => {
                setStep('email')
                setOtp('')
                setError(null)
              }}
            >
              Use a different email
            </button>
            <button
              type="button"
              className="text-neon-cyan disabled:opacity-50"
              disabled={busy}
              onClick={() => run(() => sendCode(email.trim()))}
            >
              Resend code
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-neon-magenta">{error}</p>}

      <div className="flex items-center gap-3 text-xs text-ink-muted">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-2">
        <Button type="button" variant="outline" onClick={() => social('line')}>
          Continue with LINE
        </Button>
        <Button type="button" variant="outline" onClick={() => social('google')}>
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

export default LoginForm;