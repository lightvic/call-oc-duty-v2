import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import PersonelDounghnut from './components/PersonnelDoughnut/PersonelDounghnut'
import ColocDounghnut from './components/ColocDoughnut/ColocDounghnut'
import Repayment from './components/Repayment/Repayment'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

reportWebVitals()
