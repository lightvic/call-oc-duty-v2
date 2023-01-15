import React, { useEffect, useState } from 'react'
import { Toast } from '../../index'
import { PieChart, Pie, Cell } from 'recharts'
import { useNavigate } from 'react-router-dom'

export default function PersonalStat() {
  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [expenses, setExpense] = useState()

  const token = JSON.parse(sessionStorage.token)
  const coloc_uuid = sessionStorage.getItem('coloc_uuid')
  const navigate = useNavigate()

  const info = () => {
    setShowToast((showToast) => !showToast)
    setTypeToast('info')
    setMessageToast('En cours de développement.')
  }

  useEffect(() => {
    fetch(`http://localhost:4557/api/colocStat/${coloc_uuid}`, {
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
        setExpense(json.userExpense)
      })
  }, [])

  if (expenses != null) {
    var totalValue = 0
    const COLORS = []
    const data = []

    expenses.map((expenses, index) =>
      data.push({ name: expenses.category, value: parseInt(expenses.value) }),
    )

    data.forEach((category) => {
      if (category.name === 'Charges/Loyer') {
        COLORS.push('#2F58D7')
      }
      if (category.name === 'Courses') {
        COLORS.push('#5476DE')
      }
      if (category.name === 'Soirées') {
        COLORS.push('#7692E5')
      }
      if (category.name === 'Abonnements') {
        COLORS.push('#98ADEB')
      }
      if (category.name === 'Nécessités') {
        COLORS.push('#BBC9F2')
      }
      if (category.name === 'Autres') {
        COLORS.push('#E5EBFE')
      }
    })

    data.forEach((value) => {
      totalValue = totalValue + value.value
    })

    return (
      <>
        <div className="stats-container">
          <div className="stats-info">
            <div className="donut">
              <div>
                <PieChart width={108} height={108}>
                  <Pie
                    data={data}
                    cx={50}
                    cy={50}
                    innerRadius={40}
                    outerRadius={54}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    ;
                  </Pie>
                </PieChart>
              </div>
            </div>
            <div className="stats-info-text">
              <p>Dépenses personnelles</p>
              <p>Statut actuel</p>
              <p>{totalValue} €</p>
            </div>
          </div>
          <div onClick={info} className="stats-buttons">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Toast show={showToast} type={typeToast} message={messageToast} />
      </>
    )
  } else {
    return (
      <div className="no-stats-container">
        <p className="no-stats">
          Pour consulter vos stats, ajoutez des dépenses.
        </p>
      </div>
    )
  }
}
