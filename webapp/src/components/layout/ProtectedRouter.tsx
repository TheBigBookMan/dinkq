import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "../../features/auth/hooks";
import PageLoading from "../shared/PageLoading";
import PageError from "../shared/PageError";

interface ProtectedRouteProps {
  requireAuth: boolean;
}

const ProtectedRouter = ({requireAuth = true}: ProtectedRouteProps) => {
  const session = useSession();
  const location = useLocation();

  if (session.isPending) return <PageLoading />

  if (session.error) return <PageError
    error={"Couldn't load this session"} 
    isDisabled={session.isPending} 
    description={"Check your connection and try again. If it keeps happening, the link may have expired."} 
    refetch={session.refetch} 
   />

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