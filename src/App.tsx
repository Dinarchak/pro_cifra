import LoginPage from './components/Pages/Login/login';
import RegisterPage from './components/Pages/Register/register';
import MainLayout from './components/Layouts/MainLayout/MainLayout';

import { createBrowserRouter, RouterProvider } from 'react-router';

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
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
