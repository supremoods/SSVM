import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Products from './pages/products'
import Reset from './pages/reset'
import PageNotFound from './pages/pageNotFound'

export const Router = createBrowserRouter(
   [
      {
         path:'/',
         element: <Login/>
      },
      {
         path:'/dashboard',
         element: <Dashboard />
      },
      {
         path:'/products',
         element: <Products />
      },
      {
         path:'/reset',
         element: <Reset />
      },
      {
         path:'*',
         element: <PageNotFound />
      }
   ]
) 

export default Router