import React from 'react'
import { InputForm, Toast } from '../../components'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      name: 'pwd',
      placeholder: 'Entrez votre mot de passe.',
    },
  ]

  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setShowToast(false)
    e.preventDefault()

    const form = document.querySelectorAll('form')[0]

    let array = []
    for (let i = 0; i < 2; i++) {
      array.push((form[i] as HTMLInputElement).value)
    }

    const data = {
      email: array[0],
      pwd: array[1],
    }

    fetch('http://localhost:4557/api/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: new Headers({
        Authorization: 'Basic amZnbWFpbC5jb206cGFzc3dvcmQ=',
        'Content-type': 'application/json',
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.token) {
          sessionStorage.setItem('token', JSON.stringify(json))
          navigate('/select-coloc')
        }
        setShowToast((showToast) => !showToast)
        setTypeToast('error')
        setMessageToast({ isError: true, message: json.error }.message)
      })
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
          />
        ))}
        <button type="submit">Se connecter</button>
      </form>
      <Toast show={showToast} type={typeToast} message={messageToast} />
    </>
  )
}
