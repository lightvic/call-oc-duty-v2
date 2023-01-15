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
  console.log(repayments)
  if (repayments) {
    return (
      <>
        <div className="purshases-container purshases-container--repayment">
          <div>
            <p className="purchases-title">Remboursement</p>
            <div className="purchases-bar"> </div>
          </div>
          {repayments.map((repayment, i) => (
            <div key={i}>
              <div className="repayment">
                <p>
                  <span className="repayment-span">{repayment.this_user}</span>{' '}
                  doit rembourser à{' '}
                  <span className="repayment-span">{repayment.to}</span> la
                  somme de
                </p>
                <span className="repayment-span"> {repayment.owes} € </span>
              </div>
              <div className="purchases-bar"> </div>
            </div>
          ))}
        </div>
      </>
    )
  } else {
    return (
      <div className="purshases-container-empty">
        <div>
          <p className="purchases-title">Dépenses récentes</p>
          <div className="purchases-bar"> </div>
        </div>
        <p className="empty-purchases">Pas de remboursements pour le moment.</p>
      </div>
    )
  }
}
