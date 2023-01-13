import { IconCalendar } from '../../../assets'

export default function RecentExpenses() {
  const purchase = {
    type: 'Type', //expense.type
    date: '01/01/2023', //expense.date
    value: 300, //expense.type
    icon: <IconCalendar color={'#000'} />,
  }

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
  const expenseDate = new Date(purchase.date)

  return (
    <button>
      {purchase.icon} {purchase.type} {expenseDate.getDay() + 1}{' '}
      {ListMonth[expenseDate.getMonth()]} {expenseDate.getFullYear()}
      <span> {purchase.value} € </span>
    </button>
  )
}

// single recent purchase
// on click -> open PurchaseInfoModal
