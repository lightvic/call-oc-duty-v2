import React, { useState, useEffect } from 'react'
import ModalContainer from '../ModalContainer/ModalContainer'

export default function PurchaseInfoModal({
  purchaseInfo,
}: {
  purchaseInfo: boolean
}) {
  return (
    <ModalContainer isOpen={purchaseInfo}>
      <p>test</p>
    </ModalContainer>
  )
}

// open a modal with purchase info
