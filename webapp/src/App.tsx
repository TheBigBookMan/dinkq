import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRouter from './components/layout/ProtectedRouter';
import OrganiserPage from './pages/organiser/OrganiserPage';
import OrganiserLayout from './components/layout/OrganiserLayout';
import SessionPage from './pages/organiser/SessionPage';
import NewSessionPage from './pages/organiser/NewSessionPage';
import ClubPage from './pages/organiser/ClubPage';
import SessionsPage from './pages/organiser/SessionsPage';
import PlayerPage from './pages/PlayerPage';

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
            index: true, element: <OrganiserPage /> 
          },
          {
            path: 'club',
            element: <ClubPage />
          },
          {
            path: 'sessions',
            element: <SessionsPage />
          },
          {
            path: 'sessions/:sessionId',
            element: <SessionPage />
          },
          {
            path: 'sessions/new',
            element: <NewSessionPage />
          },
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
