import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../features/auth/hooks";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import PageLoading from "../shared/PageLoading";

interface ProtectedRouteProps {
  requireAuth: boolean;
}

const ProtectedRouter = ({requireAuth = true}: ProtectedRouteProps) => {
  const session = useSession();
  console.log(session);

  if (session.isPending) return <PageLoading />

  if (session.isError) {
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
          {/* <Button variant="outline" onClick={() => session.refetch()} disabled={session.isFetching}>
            Try again
          </Button> */}
        </section>
      </main>
    )
  }

  if (requireAuth && !session.userData) return <Navigate to="/login" />

  return (
    <Outlet />
  )
}

export default ProtectedRouter;