import React, { useEffect } from 'react'
import { InputForm, Toast } from '../../components'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SigninForm() {
  const inputs = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'john-bob@gmail.com',
      length: 0,
    },
    {
      label: 'Mot de passe',
      type: 'password',
      name: 'pwd',
      placeholder: '•••••••',
      length: 4,
    },
  ]

  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    let array = []

    setShowToast(false)
    e.preventDefault()

    const form = document.querySelectorAll('form')[0]
    for (let i = 0; i < 2; i++) {
      array.push((form[i] as HTMLInputElement).value)
    }
    const data = {
      email: array[0],
      pwd: array[1],
    }

    if (array.includes('')) {
      setShowToast(true)
      setTypeToast('error')
      setMessageToast('Tous les champs doivent être remplit.')
    } else
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
          setShowToast(true)
          setTypeToast('error')
          setMessageToast({ isError: true, message: json.error }.message)
        })
  }

  const google = () => {
    setShowToast(true)
    setTypeToast('success')
    setMessageToast('FEUR')
  }

  return (
    <div className="signin-signup">
      <div className="signin-signup-container">
        <p className="signin-signup-title">Connexion</p>
        <p className="signin-signup-subtitle">
          Heureux de vous revoir ! Entrez vos informations
        </p>

        <form onSubmit={handleSubmit}>
          {inputs.map((input, i) => (
            <InputForm
              key={i}
              label={input.label}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              length={input.length}
            />
          ))}
          <button className="submit" type="submit">
            Se connecter
          </button>
        </form>
        <div onClick={google} className="button-google">
          <img src="/google.png" alt="Bouton connection Google" />
          <p>Se connecter avec Google</p>
        </div>

        <p className="signin-signup-footer">
          Vous n'avez pas de compte ? <a href="/signup">Créez un compte</a>
        </p>
      </div>

      <Toast show={showToast} type={typeToast} message={messageToast} />
    </div>
  )
}
