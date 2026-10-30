import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "../../features/auth/hooks";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import PageLoading from "../shared/PageLoading";

interface ProtectedRouteProps {
  requireAuth: boolean;
}

const ProtectedRouter = ({requireAuth = true}: ProtectedRouteProps) => {
  const session = useSession();
  const location = useLocation();

  if (session.isPending) return <PageLoading />

  if (session.error) {
    return (
      <main className="grid min-h-dvh place-items-center p-4">
        <section className="neon-card w-full max-w-md space-y-6 p-6 text-center backdrop-blur-xl sm:p-9">
          <p className="font-display text-2xl font-bold">
            Dink<span className="text-neon-magenta text-glow">Q</span>
          </p>
          <div role="alert" className="space-y-2">
            <h1 className="font-display text-xl font-semibold">Couldn't load this session</h1>
            <p className="text-sm text-ink-muted">
              Check your connection and try again. If it keeps happening, the link may have expired.
            </p>
          </div>
          <Button variant="outline" onClick={() => session.refetch()} disabled={session.isPending}>
            Try again
          </Button>
        </section>
      </main>
    )
  }

   if (requireAuth && !session.data) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  if (!requireAuth && session.data) {
    const redirect = new URLSearchParams(location.search).get("redirect")
    const safe = redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/organiser"
    return <Navigate to={safe} replace />
  }

  return (
    <Outlet />
  )
}

export default ProtectedRouter;