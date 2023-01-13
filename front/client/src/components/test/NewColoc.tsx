import React from 'react'
import InputForm from '../Inputs/InputForm/InputForm'

export interface formDataInterface {
  address: string
  town: string
  post_code: string
  users: {
    value: string
  }
}

export default function NewColoc() {
  const inputs = [
    {
      label: 'Adresse',
      type: 'text',
      name: 'address',
      placeholder: 'Adresse',
    },
    {
      label: 'Ville',
      type: 'text',
      name: 'town',
      placeholder: 'Ville',
    },
    {
      label: 'code postal',
      type: 'text',
      name: 'post_code',
      placeholder: '1234',
    },
    {
      label: 'Adresse',
      type: 'text',
      name: 'address',
      placeholder: 'Adresse',
    },
  ]
  const buttonAction = () => {}

  return (
    <>
      <form>
        {inputs.map((input, i) => (
          <InputForm
            key={i}
            label={input.label}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
          />
        ))}
      </form>
      <button onClick={buttonAction}>Se connecter</button>
    </>
  )
}
