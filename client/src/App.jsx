import { useState } from 'react'
import Signup from './signup/Signup.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './login/Login.jsx'
import Home from './Home.jsx'

function App() {

  const route = createBrowserRouter([
    {
      path: "/register",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/home",
      element: <Home/>
    }
  ])

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
