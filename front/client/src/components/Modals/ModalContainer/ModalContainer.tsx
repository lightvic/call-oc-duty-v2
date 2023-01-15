import React, { useState } from 'react'
import { IconClose } from '../../../assets'

export default function ModalContainer({
  children,
  isOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
}) {
  const closeModal = () => {
    ;(document.querySelector(
      '.modal-page',
    ) as HTMLElement | null)!.style.display = 'none'
  }

  return (
    <div
      className="modal-page"
      style={isOpen ? { display: 'flex' } : { display: 'none' }}
    >
      <div className="modal-container">
        <div className="title-modal">
          Renseigner les informations
          <span onClick={closeModal} className="close-modal">
            <IconClose />
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

// Modal container empty
// import this component in other modals
