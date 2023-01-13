import {
  FilterButton,
  Menu,
  PurchasesContainer,
  RedirectButton,
} from '../../components'

export default function Dashboard() {
  const filters = [
    {
      value: '12 mois',
    },
    {
      value: '30 jours',
    },
    {
      value: '7 jours',
    },
    {
      value: '24 heures',
    },
  ]
  return (
    <>
      <Menu />
      <div className="dashboard-container">
        <div className="dashboard-info">
          <p className="dashboard-info__title">Call Oc Duty dashboard</p>
          <p>Bon retour, Anthony !</p>
        </div>

        <div className="dashboard-buttons">
          <FilterButton filters={filters} />
          {/* <RedirectButton src={''} name={'Filter button'} type={'primary'} /> */}
        </div>
        {/* <PurchasesContainer /> */}
      </div>
    </>
  )
}
