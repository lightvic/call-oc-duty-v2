import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconClose } from '../../../assets'
import ModalContainer from '../../Modals/ModalContainer/ModalContainer'
import PurchaseInfoModal from '../../Modals/PurchaseInfoModal/PurchaseInfoModal'

export default function RecentPurchase() {
  const [purchases, setPurchases] = useState()

  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const coloc_uuid = sessionStorage.getItem('coloc_uuid')

  useEffect(() => {
    fetch(`http://localhost:4557/api/fixExpense/${coloc_uuid}`, {
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
    // const expenseDate = new Date(purchase.date)
    return (
      <div className="purshases-container purshases-container--reccurent">
        <div>
          <p className="purchases-title">Dépenses récurentes (tous les mois)</p>
          <div className="purchases-bar"> </div>
        </div>
        {purchases &&
          purchases?.map((purchase, i) => (
            <>
              <div key={i} className="purchase">
                <div className="purchase-category">
                  <img
                    src="/basket-logo.jpg"
                    alt=""
                    className="purchase-icon"
                  />
                </div>
                <p>{purchase.name}</p>
                <p>
                  {new Date(purchase.date).getDate()}{' '}
                  {ListMonth[new Date(purchase.date).getMonth()]}
                </p>
                <p>{purchase.pseudo}</p>
                <p>{purchase.value} €</p>
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
          <p className="purchases-title">Dépenses récurentes (tous les mois)</p>
          <div className="purchases-bar"> </div>
        </div>
        <p className="empty-purchases">
          Pour consulter les dépenses récurentes, ajoutez des dépenses.
        </p>
      </div>
    )
  }
}
