import { FilterButton, Menu } from '../../components'
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
  return (
    <>
      <Menu />
      <div className="dashboard-container">
        <div className="dashboard-info">
          <p className="dashboard-info__title">Call Oc Duty dashboard</p>
          <p>Bon retour, {(currentUser as any).pseudo} !</p>
        </div>

        <div className="dashboard-buttons">
          <FilterButton filters={filters} />
        </div>
      </div>
    </>
  )
}
