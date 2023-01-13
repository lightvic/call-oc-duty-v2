import React from 'react'
import { ButtonDropdown } from '../../index'

export default function FlatsharesInfoContainer({
  flatsharesName,
}: {
  flatsharesName: string
}) {
  const choices = [
    {
      value: 'Modifier ma coloc',
    },
    {
      value: 'Ajouter une nouvelle coloc',
    },
    {
      value: 'Voir mes autres coloc',
    },
  ]
  return (
    <button className="flatshares-info-container">
      <img className="flatshares-image" src="/img.jpeg" alt="Flatshare image" />
      <ButtonDropdown
        buttonStyle={'flatshares'}
        title={flatsharesName}
        choices={choices}
        defaultValue={''}
      />
    </button>
  )
}

// On click -> button dropdown with flatshares, modify button, create new flatshares
// On click modify button / "create new flateshares" -> open modal
// modify / create -> open modal
