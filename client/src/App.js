import React from 'react'
import {RouterProvider} from 'react-router-dom'
import Router from './Router'

const App = () => {
  return (
      <main>
         <RouterProvider router={Router}></RouterProvider>
      </main>
  )
}

export default App