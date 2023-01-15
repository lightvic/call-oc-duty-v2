import {
  FilterButton,
  Menu,
  PurchasesButton,
  ColocStat,
  PersonalStat,
  ReccurentPurchase,
  RecentPurchase,
} from '../../components'
import jwt_decode from 'jwt-decode'

export default function Dashboard() {
  const filters = [
    {
      value: '12 mois',
      timeLimit: 365,
    },
    {
      value: '30 jours',
      timeLimit: 30,
    },
    {
      value: '7 jours',
      timeLimit: 7,
    },
    {
      value: '24 heures',
      timeLimit: 1,
    },
  ]
  const currentUser = jwt_decode(sessionStorage.token)
  const colocUuid = sessionStorage.getItem('coloc_uuid')
  const colocName = sessionStorage.getItem('coloc_name')

  return (
    <>
      <Menu />
      <div className="dashboard-container">
        <div className="dashboard-info">
          <p className="dashboard-info__title">{colocName} dashboard</p>
          <p>Heureux de vous revoir, {(currentUser as any).pseudo} !</p>
        </div>

        <div className="dashboard-buttons">
          <FilterButton filters={filters} />
          <PurchasesButton button={'Ajouter une dépense'} />
        </div>

        <div className="dashboard-donuts-container">
          <PersonalStat />
          <span className="dashboard-donuts-space"></span>
          <ColocStat />
        </div>

        <div className="purchases-container">
          <ReccurentPurchase />
          Recent
        </div>
      </div>
    </>
  )
}
