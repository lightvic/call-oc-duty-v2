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

export default function SettingsForm() {
  const emailInput = {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'ex : jean.martin@bidule.com',
  }
  const pseudoInput = {
    label: 'Pseudo',
    type: 'text',
    name: 'pseudo',
    placeholder: 'JeanMartin90',
  }
  const pwdInputs = [
    {
      label: 'Mot de passe',
      type: 'password',
      name: 'password',
      placeholder: 'Conseil : 8 caractères min',
    },
    {
      label: 'Confirmer le mot de passe',
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirmez votre mot de passe',
    },
  ]
  const profilePicInput = {
    label: 'Photo de profil',
    type: 'image',
    name: 'profilePic',
    placeholder: '',
  }

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
    <>
      <form>
        <InputForm
          label={emailInput.label}
          type={emailInput.type}
          name={emailInput.name}
          placeholder={emailInput.placeholder}
        />
        <button type="submit">Valider</button>
      </form>
      <form>
        <InputForm
          label={pseudoInput.label}
          type={pseudoInput.type}
          name={pseudoInput.name}
          placeholder={pseudoInput.placeholder}
        />
        <button type="submit">Valider</button>
      </form>
      <form>
        {pwdInputs.map((pwdInput, i) => (
          <InputForm
            key={i}
            label={pwdInput.label}
            type={pwdInput.type}
            name={pwdInput.name}
            placeholder={pwdInput.placeholder}
          />
        ))}
        <button type="submit">Valider</button>
      </form>
      <form>
        <InputForm
          label={profilePicInput.label}
          type={profilePicInput.type}
          name={profilePicInput.name}
          placeholder={profilePicInput.placeholder}
        />
        <button type="submit">Valider</button>
      </form>
      <h3>DANGER</h3>
      <button type="submit">Supprimer le compte</button>
    </>
  )
}
