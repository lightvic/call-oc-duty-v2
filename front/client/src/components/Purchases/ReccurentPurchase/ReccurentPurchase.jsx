// import React, { useState, useEffect } from 'react'
// import { IconVector } from '../../../assets'
// import { useNavigate } from 'react-router-dom'
// import jwt_decode from 'jwt-decode'

// export default function ReccurentPurchase() {
//   const token = JSON.parse(sessionStorage.token)
//   const navigate = useNavigate()

//   //'/api/unFixExpense/{colocUuid}&{limitDate}'
//   const [purchases, setPurchases] = useState()
//   useEffect(() => {
//     fetch('http://localhost:4557/api//44a36f45-010f-4bf7-a7f0-8434108fecd6', {
//       method: 'GET',
//       headers: new Headers({
//         Authorization: 'Bearer ' + token.token,
//       }),
//     })
//       .then((data) => data.json())
//       .then((json) => {
//         if (json.message === 'invalid cred') {
//           sessionStorage.removeItem('token')
//           navigate('/signin')
//         }
//         setPurchases(json.unfix)
//       })
//   }, [])
//   console.log(purchases)
//   const date = new Date('2023-01-13 21:17:44')
//   console.log(date.getDate())
//   if (purchases != null) {
//     const ListMonth = [
//       'Janvier',
//       'Février',
//       'Mars',
//       'Avril',
//       'Mai',
//       'Juin',
//       'Juillet',
//       'Août',
//       'Sptembre',
//       'Octobre',
//       'Novembre',
//       'Décembre',
//     ]
//     // const expenseDate = new Date(purchase.date)
//     return purchases.map((purchase) => (
//       <button>
//         {purchase.icon} {purchase.name} {new Date(purchase.date).getDate()}{' '}
//         {ListMonth[new Date(purchase.date).getMonth()]} {purchase.pseudo}{' '}
//         {purchase.value} €
//       </button>
//     ))
//   } else {
//     return null
//   }
// }
// single reccurent purchase
// on click -> open PurchaseInfoModal

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
