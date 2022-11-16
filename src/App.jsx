import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './Rotes/Routes'

function App() {


  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
