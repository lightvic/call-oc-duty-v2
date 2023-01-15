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
      <img className="flatshares-image" src="/img.png" alt="Flatshare image" />
      <ButtonDropdown
        buttonStyle={'flatshares'}
        title={flatsharesName}
        choices={choices}
        defaultValue={''}
      />
    </button>
  )
}
