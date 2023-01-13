import React from 'react'

export default function ButtonAction({ button }: { button: string }) {
  const buttonAction = () => {
    switch (button) {
      case 'Enregistrer':
        // request
        break

      case 'Ajouter':
        // request
        break

      case 'Modifier':
        // request
        break

      case 'Supprimer':
        // request
        break

      case 'Annuler':
        break

      default:
        break
    }
  }
  return (
    <button className="button-action" onClick={buttonAction}>
      {button}
    </button>
  )
}
