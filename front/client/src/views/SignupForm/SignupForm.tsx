import React from 'react'
import { InputForm, Toast } from '../../components'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface formDataInterface {
  pseudo: string
  email: string
  pwd: string
}

export interface Ierror {
  isError: boolean
  message: string
}

export default function SignupForm() {
  const inputs = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'ex : jean.martin@bidule.com',
    },
    {
      label: 'Pseudo',
      type: 'text',
      name: 'pseudo',
      placeholder: 'JeanMartin90',
    },
    {
      label: 'Mot de passe',
      type: 'password',
      name: 'pwd',
      placeholder: 'Conseil : 8 caractères min',
    },
    {
      label: 'Confirmer le mot de passe',
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Confirmez votre mot de passe',
    },
  ]

  // const [formData, setFormData] = useState<formDataInterface>({
  //   pwd: '',
  //   pseudo: '',
  //   email: '',
  // })

  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const test = document.querySelectorAll('form')[0]

    let array = []
    for (let i = 0; i < 3; i++) {
      array.push((test[i] as HTMLInputElement).value)
    }

    const data = {
      email: array[0],
      pseudo: array[1],
      pwd: array[2],
    }

    // setFormData(filsdepute)

    console.log(array)

    e.preventDefault()

    fetch('http://localhost:4557/api/signUp', {
      method: 'POST',
      mode: 'cors',
      body: new URLSearchParams({
        ...data,
      }),
      credentials: 'include',
      headers: new Headers({
        Authorization: 'Basic amZnbWFpbC5jb206cGFzc3dvcmQ=',
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    })
      .then((data) => data.json())

      .then((json) => {
        if (json.token) {
          sessionStorage.setItem('token', JSON.stringify(json))
          navigate('/dashboard')
        }
        setShowToast((showToast) => !showToast)
        setTypeToast('error')
        setMessageToast({ isError: true, message: json.error }.message)
      })
  }

  const handleChange = (e: ChangeEvent) => {
    // setFormData((prevState) => {
    //   return {
    //     ...prevState,
    //     // @ts-ignore
    //     [e.target.name]: e.target.value,
    //   }
    // })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">S'inscrire</button>
      </form>

      <Toast show={showToast} type={typeToast} message={messageToast} />
    </>
  )
}
