import { LoginForm } from "../components/features/auth/LoginForm"

const Login = () => {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden p-4">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-neon-violet/25 blur-3xl"
      />

      <LoginForm />
    </main>
  )
}

export default Login;