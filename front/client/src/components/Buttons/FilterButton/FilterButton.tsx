import React, { useState } from 'react'

export default function FilterButton({
  filters,
}: {
  filters: {
    value: string
    timeLimit: number
  }[]
}) {
  const [selectedFilter, setSelectedFilter] = useState('12 mois')
  const getFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    setSelectedFilter(e.currentTarget.innerHTML)
    e.currentTarget.getAttribute('data-time-limit')
    const date = {
      value: e.currentTarget.innerHTML,
      limit: e.currentTarget.getAttribute('data-time-limit'),
    }
    sessionStorage.setItem('date', JSON.stringify(date))
  }

  return (
    <div className="filter-button-container">
      {filters.map((filter, i) => (
        <div
          key={i}
          data-time-limit={filter.timeLimit}
          className="filter"
          style={
            filter.value === selectedFilter
              ? { backgroundColor: 'var(--main-color)', color: 'var(--white)' }
              : { backgroundColor: '' }
          }
          onClick={getFilter}
        >
          {filter.value}
        </div>
      ))}
    </div>
  )
}

// Filter "12 mois" / "30 jours" / "7 jours" / "24 heures"
