import { Outlet } from "react-router-dom"
import { Header } from "../../features/organiser/components/Header";
import { useAuth } from "../../features/auth/hooks";
import { useLiveSession } from "../../features/sessions/hooks";

const OrganiserLayout = () => {
  const { logout } = useAuth();
  const { data: live } = useLiveSession(); // LiveSessionStats | null/undefined when nothing is live

  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        live={live ? { startedAt: live.startedAt, to: `/organiser/sessions/${live.sessionId}` } : null}
        onLogout={logout}
      />
      <Outlet />
    </div>
  )
}

export default OrganiserLayout;