import React, {useState, useEffect} from "react";
import { IconVector } from "../../../assets"
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function ReccurentPurchase() {
  const token = JSON.parse(sessionStorage.token)

//'/api/unFixExpense/{colocUuid}&{limitDate}'
  const [purchases, setPurchases]= useState()
  useEffect(() => {
    fetch('http://localhost:4557/api/fixExpense/44a36f45-010f-4bf7-a7f0-8434108fecd6&365', {
      method: "GET",
      headers: new Headers({
        Authorization: 'Bearer ' + token.token
    })
  })
  .then((data) => data.json())
  .then((json) => {
    setPurchases(json.unfix)
  })
}, [])
  const date = new Date("2023-01-13 21:17:44")
  if (purchases != null){
    const ListMonth = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Sptembre",
                      "Octobre","Novembre","Décembre"]    
    // const expenseDate = new Date(purchase.date)
    return(
      purchases.map((purchase) =>
      <button>
      {purchase.icon} {purchase.name} {new Date(purchase.date).getDate()} {ListMonth[new Date(purchase.date).getMonth()]} {purchase.pseudo} {purchase.value} €
      </button>
      )
    )
  }
  else{
    return null;
  }
}
// single reccurent purchase
// on click -> open PurchaseInfoModal
