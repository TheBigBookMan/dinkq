import { Outlet, useParams } from 'react-router-dom'
import OrganiserHeader from '../../features/clubs/organiser/OrganiserHeader'
import { useClub } from '../../features/clubs/hooks'

const ClubLayout = () => {
  const { clubId } = useParams()
  // TEMP DUMMY NO ISPENDING OR ISERROR YET
  const club = useClub(clubId)
  // const { isPending, isError } = useClub(clubId)

  // if (isPending) return <p>Loading…</p>          // your PageLoading
  // if (isError) return <p>Club not found.</p>     // your NotFound

  return (
    <div className="space-y-2 px-4">
      <OrganiserHeader />
      <Outlet />
    </div>
  )
}

export default ClubLayout;