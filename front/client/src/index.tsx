import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/store'
// import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import PersonelDounghnut from './components/PersonnelDoughnut/PersonelDounghnut'
import ColocDounghnut from './components/ColocDoughnut/ColocDounghnut'
import { ReccurentPurchase, RecentPurchase } from './components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
     <App />
    {/* </Provider> */}
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
