import React, { useState } from 'react'
import NewExpenseForm from '../../../views/NewExpenseForm/NewExpenseForm'
import ModalContainer from '../../Modals/ModalContainer/ModalContainer'

export default function PurchasesButton({ button }: { button: string }) {
  const [purchaseModal, setPurchaseModal] = useState(false)

  const addPurchase = () => {
    setPurchaseModal((purchaseModal) => !purchaseModal)
  }

  return (
    <>
      <button className="add-purchases" onClick={addPurchase}>
        {button}
      </button>

      <ModalContainer isOpen={purchaseModal}>
        <NewExpenseForm />
      </ModalContainer>
    </>
  )
}
