import React, { useEffect, useState } from 'react'
import {
  Dashboard,
  SignupForm,
  SigninForm,
  Home,
  InProgress,
  Colocs,
} from './views'
import './styles/global.css'
import { Route, Routes } from 'react-router-dom'
import NeedAuth from './routes/NeedAuth'
import PersonelDounghnut from './components/PersonnelDoughnut/PersonelDounghnut'

interface authInterface {
  value: boolean
}

function App() {
  const [auth, setAuth] = useState<authInterface>({ value: false })

  useEffect(() => {
    if (sessionStorage.token) {
      setAuth({ value: true })
    }
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />

        <Route
          path={'/select-coloc'}
          element={
            <NeedAuth>
              <Colocs />
            </NeedAuth>
          }
        />
        <Route
          path={'/dashboard'}
          element={
            <NeedAuth>
              <Dashboard />
            </NeedAuth>
          }
        />

        <Route
          path={'/pot'}
          element={
            <NeedAuth>
              <InProgress />
            </NeedAuth>
          }
        />

        <Route
          path={'/calendar'}
          element={
            <NeedAuth>
              <InProgress />
            </NeedAuth>
          }
        />

        <Route
          path={'/notifications'}
          element={
            <NeedAuth>
              <InProgress />
            </NeedAuth>
          }
        />

        <Route
          path={'/todolist'}
          element={
            <NeedAuth>
              <InProgress />
            </NeedAuth>
          }
        />

        <Route
          path={'/chat'}
          element={
            <NeedAuth>
              <InProgress />
            </NeedAuth>
          }
        />
      </Routes>
    </div>
  )
}

export default App
