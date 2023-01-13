import React, { useState } from 'react'

export default function ModalContainer({
  children,
  isOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
}) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div
      className="modal-page"
      style={isOpen ? { display: 'flex' } : { display: 'none' }}
    >
      <div className="modal-container">{children}</div>
    </div>
  )
}

// Modal container empty
// import this component in other modals
