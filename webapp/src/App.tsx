import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/layout/ProtectedRouter';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute requireAuth={false} />,
    children: [
      {
        path: '/login', 
        element: <Login />
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
