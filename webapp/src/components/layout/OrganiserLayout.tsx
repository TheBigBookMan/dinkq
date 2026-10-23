import { Outlet } from "react-router-dom"
import { Header } from "../../features/organiser/components/Header";
import { useAuth } from "../../features/auth/hooks";
import { useLiveSession } from "../../features/sessions/hooks";
import { formatDuration } from "../../lib/utils";
import { useNow } from "../../hooks/useNow";

const OrganiserLayout = () => {
  const {logout} = useAuth();
  const liveStats = useLiveSession();

  const now = useNow()
  const running = now - liveStats.startedAt

  return (
    <div className='min-h-screen flex flex-col'>
      <Header 
        live={{
          startedAt: formatDuration(running), 
          to: `/organiser/sessions/$liveStats.{sessionId}`
        }}
        onLogout={logout} />
      <Outlet />
    </div>
  )
}

export default OrganiserLayout;