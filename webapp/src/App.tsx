import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRouter from './components/layout/ProtectedRouter';
import OrganiserPage from './pages/organiser/OrganiserPage';
import OrganiserLayout from './components/layout/OrganiserLayout';
import SessionPage from './pages/organiser/SessionPage';
import NewSessionPage from './pages/organiser/NewSessionPage';
import ClubPage from './pages/organiser/ClubPage';
import PlayerPage from './pages/PlayerPage';
import ClubLayout from './components/layout/ClubLayout';
import ClubDetails from './features/clubs/organiser/ClubDetails';
import ClubTabsLayout from './features/clubs/organiser/ClubTabsLayout';
import ClubRoster from './features/clubs/organiser/ClubRoster';
import ClubStats from './features/clubs/organiser/ClubStats';
import ClubSettings from './features/clubs/organiser/ClubSettings';
import AccountPage from './pages/AccountPage';
import NewClubPage from './pages/organiser/NewClubPage';
import ClubsPage from './pages/organiser/ClubsPage';
import ClubPlayer from './pages/organiser/ClubPlayer';
import SessionsLayout from './components/layout/SessionsLayout';
import UpcomingSessions from './features/organiser/components/UpcomingSessions';
import RecentSessions from './features/clubs/organiser/player/RecentSessions';

// TODO need to sort out the requireAuth for players logging in as guest and stuff where no auth required
const router = createBrowserRouter([
  {
    element: <ProtectedRouter requireAuth={false} />,
    children: [
      {
        path: '/login', 
        element: <Login />
      }
    ]
  },
  {
    element: <ProtectedRouter requireAuth={true} />,
    children: [
      {
        path: '/organiser',
        element: <OrganiserLayout />,
        children: [
          {
            index: true, 
            element: <OrganiserPage /> 
          },
          {
            path: 'clubs',
            element: <ClubsPage />
          },
          {
            path: 'club/new-club',
            element: <NewClubPage />
          },
          {
            path: 'club/:clubId',
            element: <ClubLayout />,
            children: [
              {
                index: true,
                element: <ClubPage />
              },
              {
                element: <ClubTabsLayout />,
                children: [
                  { 
                    path: 'details', 
                    element: <ClubDetails /> 
                  },
                  {
                    path: 'roster',
                    children: [
                      {
                        index: true, element: <ClubRoster /> 
                      },
                      {
                        path: ':playerId',
                        element: <ClubPlayer />
                      }
                    ]
                  },
                  {
                    path: 'statistics',
                    element: <ClubStats />
                  },
                  {
                    path: 'settings',
                    element: <ClubSettings />
                  }
                ],
              },
            ]
          },
          {
            path: 'sessions',
            children: [
              {
                element: <SessionsLayout />,
                children: [
                  { index: true, element: <Navigate to="upcoming" replace /> },
                  { path: 'upcoming', element: <UpcomingSessions /> },   // ← here
                  { path: 'recent', element: <RecentSessions /> },
                ],
              },
              { path: 'new', element: <NewSessionPage /> },
              { path: ':sessionId', element: <SessionPage /> },
            ],
          },
          {
            path: 'sessions/:sessionId',
            element: <SessionPage />
          },
          {
            path: 'sessions/new',
            element: <NewSessionPage />
          },
          {
            path: 'account',
            element: <AccountPage />
          }
        ]
      },
      {
        path: '/player',
        element: <PlayerPage />
      }
    ]
  },
  {
    path: '/', element: <Navigate to="/live" replace />
  },
  {
    path: '*', element: <Navigate to="/login" replace />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;
