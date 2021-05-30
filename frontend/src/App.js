import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  )
}

export default App

