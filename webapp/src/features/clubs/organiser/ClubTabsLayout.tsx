import { Outlet, useParams } from 'react-router-dom'
import { TabNav } from '../../../components/layout/TabNav'

export default function ClubTabsLayout() {
  const { clubId } = useParams()
  const base = `/organiser/club/${clubId}`

  return (
    <div className="space-y-6">
      <TabNav
        label="Club sections"
        tabs={[
          { label: 'Details', to: `${base}/details` },
          { label: 'Roster', to: `${base}/roster` },
          { label: 'Statistics', to: `${base}/statistics` },
          { label: 'Settings', to: `${base}/settings` },
        ]}
      />
      <Outlet />
    </div>
  )
}