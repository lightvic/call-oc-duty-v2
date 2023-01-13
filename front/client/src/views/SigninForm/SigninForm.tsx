import React from 'react'
import { InputForm } from '../../components'
import { ChangeEvent, useState } from 'react'

export interface formDataInterface {
  pseudo: string
  email: string
  password: string
}
export default function SigninForm() {
  const inputs = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'ex : jean.martin@bidule.com',
    },
    {
      label: 'Mot de passe',
      type: 'password',
      name: 'password',
      placeholder: 'Entrez votre mot de passe.',
    },
  ]

  const [formData, setFormData] = useState<formDataInterface>({
    password: '',
    pseudo: '',
    email: '',
  })
  const handleChange = (e: ChangeEvent) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        // @ts-ignore
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <form>
      {inputs.map((input, i) => (
        <InputForm
          key={i}
          label={input.label}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Se connecter</button>
    </form>
  )
}
