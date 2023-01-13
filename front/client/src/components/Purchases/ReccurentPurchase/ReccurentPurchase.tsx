import { IconVector } from "../../../assets"

export default function MonthlyPurchase() {
  const purchase = {
      user : "Victo", // user.pseudo
      type: "Type",  //expense.type
      date: "01/01/2023", //expense.date
      value: 300, //expense.type
      icon: IconVector()
  }

  const ListMonth = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Sptembre",
                    "Octobre","Novembre","Décembre"]    
  const expenseDate = new Date(purchase.date)
  return(
    <button>{purchase.icon} {purchase.type} {expenseDate.getDay() + 1} {ListMonth[expenseDate.getMonth()]} <span> {purchase.value} € </span></button>
  )
}

// single reccurent purchase
// on click -> open PurchaseInfoModal
