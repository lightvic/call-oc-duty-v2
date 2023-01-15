import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RecentPurchase() {
  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const coloc_uuid = sessionStorage.getItem('coloc_uuid')

  const [purchases, setPurchases] = useState<Array<string>>()
  console.log(purchases)
  useEffect(() => {
    fetch(`http://localhost:4557/api/unFixExpense/${coloc_uuid}`, {
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
        setPurchases(json.unfix)
      })
  }, [])
  if (purchases) {
    const ListMonth = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Sptembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ]

    console.log(purchases)

    return (
      <div className="purshases-container purshases-container--recent">
        <div>
          <p className="purchases-title">Dépenses récentes</p>
          <div className="purchases-bar"> </div>
        </div>
        {purchases &&
          purchases?.map((purchase, i) => (
            <>
              <div key={i} className="recent-purchase">
                <div className="recent-purchase-left">
                  <div className="purchase-category">
                    <img
                      src="/basket-logo.jpg"
                      alt=""
                      className="purchase-icon"
                    />
                  </div>
                  <div>
                    <p className="recent-purchase-name">{purchase.name}</p>
                    <p className="recent-purchase-date">
                      {new Date(purchase.date).getDate()}{' '}
                      {ListMonth[new Date(purchase.date).getMonth()]}
                    </p>
                  </div>
                </div>
                <p className="recent-purchase-price">{purchase.value} €</p>
              </div>
              <div className="purchases-bar"> </div>
            </>
          ))}
      </div>
    )
  } else {
    return (
      <div className="purshases-container-empty">
        <div>
          <p className="purchases-title">Dépenses récentes</p>
          <div className="purchases-bar"> </div>
        </div>
        <p className="empty-purchases">
          Pour consulter les dépenses récentes, ajoutez des dépenses.
        </p>
      </div>
    )
  }
}
