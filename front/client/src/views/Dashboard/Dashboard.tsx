import {
  FilterButton,
  Menu,
  PurchasesButton,
  StatsContainer,
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
  const colocUuid = localStorage.getItem('coloc_uuid')

  return (
    <>
      <Menu />
      <div className="dashboard-container">
        <div className="dashboard-info">
          <p className="dashboard-info__title">Call Oc Duty dashboard</p>
          <p>Heureux de vous revoir, {(currentUser as any).pseudo} !</p>
        </div>

        <div className="dashboard-buttons">
          <FilterButton filters={filters} />
          <PurchasesButton button={'Ajouter une dépense'} />
        </div>

        <div className="dashboard-donuts-container">
          <StatsContainer title={'Dépenses Personnel'} price={'1920,29 €'} />
          <span className="dashboard-donuts-space"></span>
          <StatsContainer title={'Dépenses de la coloc'} price={'4328,44 €'} />
        </div>
      </div>
    </>
  )
}
