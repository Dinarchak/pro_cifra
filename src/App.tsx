import React from 'react';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  }
])

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <RouterProvider router={router}/>
  );
}

export default App;
