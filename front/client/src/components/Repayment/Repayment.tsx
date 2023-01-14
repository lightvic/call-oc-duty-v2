import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Repayment(){
  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const [expenses, setExpense]= useState()
  useEffect(() => {
    fetch('http://localhost:4557/api/expensesCalcul/44a36f45-010f-4bf7-a7f0-8434108fecd6', {
      method: "GET",
      headers: new Headers({
        Authorization: 'Bearer ' + token.token
    })
  })
  .then((data) => data.text())
  .then((json) => {
    // if (json.message === 'invalid cred') {
    //   sessionStorage.removeItem('token')
    //   navigate('/signin')
    // }
    console.log(json)
  })
}, [])

return <h1>yo</h1>;
}