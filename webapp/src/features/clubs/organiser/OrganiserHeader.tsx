import { useMyClubs } from "../hooks";

const OrganiserHeader = () => {
  const clubData = useMyClubs();
    
  return (
    <header>
      <h1 className="font-display text-2xl font-bold">Club</h1>
      <div className='flex gap-2 items-center'>
        {clubData.clubIcon && <img src={clubData.clubIcon} className="w-4" />}
        <p className="text-sm text-ink-muted">{clubData.clubName}</p>
      </div>
    </header>
  )
}

export default OrganiserHeader;