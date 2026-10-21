import { Outlet } from "react-router-dom";
import { useSession } from "../../hooks/auth";
import { Spinner } from "../ui/spinner";

interface ProtectedRouteProps {
  requireAuth: boolean;
}

const ProtectedRoute = ({requireAuth = true}: ProtectedRouteProps) => {
  const session = useSession();
  console.log(session);

  if (!session.isPending) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className="text-primary">heyy</p>
        <Spinner color="primary" />
      </div>
    )
  }

  return (
    <Outlet />
  )
}

export default ProtectedRoute;