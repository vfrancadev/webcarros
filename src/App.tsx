import { createBrowserRouter} from 'react-router-dom'
import {CarDetail} from './pages/car'
import {Dashboard} from './pages/dashboard'
import {Home} from './pages/home'
import {Login} from './pages/login'
import {Register} from './pages/register'
import { New } from './pages/dashboard/new'
import { Private } from './routes/Private'

import { Layout} from './components/layout'


const router = createBrowserRouter([

  {

    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/:id",
        element: <CarDetail/>
      },
      {
        path: "/dashboard",
        element: <Private><Dashboard/></Private>

      },
      {
        path: "/home",
        element: <Home/>
      }, 
      {
        path: "/dashboard/new",
        element: <Private><New/></Private>
      },
    ]
  },
  {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },

])

export { router}