import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Repayment() {
  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()
  const colocUuid = sessionStorage.getItem('coloc_uuid')

  const [repayments, setRepayment] = useState()
  useEffect(() => {
    fetch(`http://localhost:4557/api/expensesCalcul/${colocUuid}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + token.token,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.message === 'invalid cred') {
          sessionStorage.removeItem('token')
          navigate('/signin')
        }
        setRepayment(json.expenses)
      })
  }, [])
  if (repayments != null) {
    console.log(repayments)
    return repayments.map((repayment) => (
      <div>
        {repayment.this_user} {repayment.owes} {repayment.to}
      </div>
    ))
  } else {
    return null
  }
}
