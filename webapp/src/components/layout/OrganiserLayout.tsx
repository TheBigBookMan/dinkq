import { Outlet } from "react-router-dom"
import { Header } from "../../features/organiser/components/Header";
import { useLiveSession } from "../../features/sessions/hooks";
import { useMyClubs } from "../../features/clubs/hooks";

const OrganiserLayout = () => {
  const { data: live } = useLiveSession();
  const {data: clubs} = useMyClubs();
  console.log(clubs);
  console.log(live);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header
        hasClubs={clubs && clubs.length > 0}
        live={live ? { startedAt: live.startedAt, to: `/organiser/sessions/${live.sessionId}` } : null}
      />
      <Outlet />
    </div>
  )
}

export default OrganiserLayout;