import React from 'react'
import './App.css'
import AppFrame from './AppFrame/AppFrame'
import { BrowserRouter as Router } from 'react-router-dom'


function App() {


  return (
    <>
      <Router>
        <AppFrame />
      </Router>
    </>
  )
}

export default App
