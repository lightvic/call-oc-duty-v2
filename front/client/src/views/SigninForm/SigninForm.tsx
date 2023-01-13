import React from 'react'
import { InputForm } from '../../components'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface formDataInterface {
  pseudo: string
  email: string
  password: string
}
export default function SigninForm() {
  // Exemple de .map avec une liste
  const multiple = [
    {
      labelClassName: 'label',
      inputId: 'email',
      labelContent: 'Email',
      inputClassName: 'inputSign',
      inputType: 'email',
      inputName: 'email',
      inputPlaceHolder: 'ex : jean.martin@bidule.com',
    },
    {
      labelClassName: 'label',
      inputId: 'password',
      labelContent: 'Mot de passe',
      inputClassName: 'inputSign',
      inputType: 'password',
      inputName: 'password',
      inputPlaceHolder: 'Entrez votre mot de passe.',
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
      {multiple.map((single, i) => (
        <InputForm
          key={i}
          label={single.labelClassName}
          inputId={single.inputId}
          labelContent={single.labelContent}
          inputClassName={single.inputClassName}
          inputType={single.inputType}
          inputName={single.inputName}
          inputPlaceHolder={single.inputPlaceHolder}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Se connecter</button>
    </form>
  )
}
