import LoginPage from './components/Pages/Login/login';
import RegisterPage from './components/Pages/Register/register';
import MainLayout from './components/Layouts/MainLayout/MainLayout';
import UserHomePage from './components/Pages/UserHomePage/UserHomePage';

import userService from './services/userService';

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
      },
      {
        path: 'users/:user_id',
        // возвращает data, соотвествующий интерфейсу User
        loader: async ({params}) => {
          const data = await userService.getUser(Number(params.user_id))
          return {data}
        },
        Component: UserHomePage
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
