import React from 'react'
import { Dashboard, SignupForm, SigninForm, Home, InProgress } from './views'
import './styles/global.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pot" element={<InProgress />} />
        <Route path="/calendar" element={<InProgress />} />
        <Route path="/notifications" element={<InProgress />} />
        <Route path="/todolist" element={<InProgress />} />
        <Route path="/chat" element={<InProgress />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </div>
  )
}
{
  /*  */
}

export default App
