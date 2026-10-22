import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRouter from './components/layout/ProtectedRouter';
import OrganiserPage from './pages/OrganiserPage';

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
        element: <OrganiserPage />
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
