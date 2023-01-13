import React, { useState } from 'react'

export default function FilterButton({
  filters,
}: {
  filters: {
    value: string
  }[]
}) {
  const [selectedFilter, setSelectedFilter] = useState('12 mois')
  const getFilter = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.target)
  }

  return (
    <div className="filter-button-container">
      {filters.map((filter, i) => (
        <div
          key={i}
          className="filter"
          style={
            filter.value === selectedFilter
              ? { backgroundColor: 'var(--main-color-light)' }
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
