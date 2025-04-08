import LoginPage from './components/Pages/Login/login';
import RegisterPage from './components/Pages/Register/register';
import MainLayout from './components/Layouts/MainLayout/MainLayout';
import UserHomePage from './components/Pages/UserHomePage/UserHomePage';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import MainPage from './components/Pages/MainPage/MainPage';
import UniversityHomePage from './components/Pages/UniversityHomePage/UniversityHomePage';

import { createBrowserRouter, RouterProvider } from 'react-router';
import AuthProvider from './provider/authProvider';


const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: 'login',
        Component: LoginPage
      },
      {
        path: 'register',
        Component: RegisterPage
      },
      {
        path: 'university/:id',
        Component: UniversityHomePage
      },
      {
        path: '/',
        Component: MainPage
      },
      {
        path: '/profile/:id',
        Component: UserHomePage
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: 'profile',
            Component: UserHomePage
          }
        ]
      }
    ]
  }
])

function App() {
  return (
    <AuthProvider><RouterProvider router={router}/></AuthProvider>
  );
}

export default App;
