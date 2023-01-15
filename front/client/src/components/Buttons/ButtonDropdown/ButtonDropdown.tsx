import React, { useContext, useState } from 'react'
import { IconVector } from '../../../assets'
import { ModalContainer, ButtonAction } from '../../index'

export default function ButtonDropdown({
  title,
  choices,
  defaultValue,
  buttonStyle,
}: {
  title: string
  choices: {
    value: string
    href: string
  }[]
  defaultValue: string
  buttonStyle: string
}) {
  const [isShow, setIsShow] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const getChoice = () => {
    setIsShow(!isShow)

    if (buttonStyle === 'flatshares') {
      setOpenModal((openModal) => !openModal)
    }
  }

  const openChoices = () => {
    setIsShow(!isShow)
  }

  const className = `button-dropdown__title--${buttonStyle}`
  return (
    <>
      {openModal && (
        <ModalContainer isOpen={true}>
          <ButtonAction button={'test'} />
        </ModalContainer>
      )}

      <button type="button" className="button-dropdown" onClick={openChoices}>
        <div className={className}>
          <div>
            {title}
            {defaultValue}
          </div>
          <span
            className="vector"
            style={
              isShow
                ? { transform: 'rotate(180deg)' }
                : { transform: 'rotate(0deg)' }
            }
          >
            <IconVector />
          </span>
        </div>
        <div
          className="button-dropdown__choices"
          style={isShow ? { display: 'block' } : { display: 'none' }}
        >
          {choices.map((choice, i) => (
            <a
              href={choice.href}
              key={i}
              className="choice"
              onClick={getChoice}
            >
              {choice.value}
            </a>
          ))}
        </div>
      </button>
    </>
  )
}
