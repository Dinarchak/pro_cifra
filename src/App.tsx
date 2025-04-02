import LoginPage from './components/Pages/Login/login';
import RegisterPage from './components/Pages/Register/register';
import MainLayout from './components/Layouts/MainLayout/MainLayout';
import UserHomePage from './components/Pages/UserHomePage/UserHomePage';
import ProtectedRoute from './components/Layouts/ProtectedRoute';
import userService from './services/userService';

import { createBrowserRouter, RouterProvider } from 'react-router';
import Avatar from './components/UI/Avatar/avatar';
import AuthProvider from './provider/authProvider';
import { h } from 'react-router/dist/development/fog-of-war-BaM-ohjc';

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
        path: '/',
        element: <h1>Главная страница</h1>
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: 'profile',
            // возвращает data, соотвествующий интерфейсу User
            loader: async ({params}) => {
              // const data = await userService.getUser(Number(params.user_id))
              // return {data}
    
              return ({
                id: 0,
                email: 'jjustdinar@yandex.ru',
                full_name: 'Фазлиев Динар Данилевич',
                type: 'Студент',
                avatar: 'https://oimages.anime-pictures.net/da0/da0679b2552d7a4b211b3319c78a2550.jpg?if=ANIME-PICTURES.NET_-_863442-6387x3382-wuthering+waves-cantarella+%28wuthering+waves%29-weishiji-single-long+hair-looking+at+viewer.jpg',
              });
    
            },
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
