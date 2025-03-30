import React from 'react';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MainLayout from './components/MainLayout/MainLayout';
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
