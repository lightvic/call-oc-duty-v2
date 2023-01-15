import React from 'react'
import { Toast } from '../../components'
import { InputForm } from '../../components'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignupForm() {
  const inputs = [
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'john-bob@gmail.com',
      length: 0,
    },
    {
      label: 'Pseudo',
      type: 'text',
      name: 'pseudo',
      placeholder: 'John',
      length: 4,
    },
    {
      label: 'Mot de passe',
      type: 'password',
      name: 'pwd',
      placeholder: '•••••••',
      length: 4,
    },
    {
      label: 'Confirmer le mot de passe',
      type: 'password',
      name: 'confirmPassword',
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
    for (let i = 0; i < 4; i++) {
      array.push((form[i] as HTMLInputElement).value)
    }
    const data = {
      email: array[0],
      pseudo: array[1],
      pwd: array[2],
    }

    const submit = fetch('http://localhost:4557/api/signUp', {
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
        setTypeToast('info')
        setMessageToast({ isError: true, message: json.error }.message)
      })

    for (let i = 0; i < array.length; i++) {
      if (array[i] === '') {
        setShowToast(true)
        setTypeToast('error')
        setMessageToast('Tous les champs doivent être remplit.')
      }
      if (!array.includes('') && array[2] !== array[3]) {
        setShowToast(true)
        setTypeToast('error')
        setMessageToast(
          'Les mots de passe ne correspondent pas. Veuillez réessayer. ',
        )
      } else submit
    }
  }
  const google = () => {
    setShowToast(true)
    setTypeToast('success')
    setMessageToast('FEUR')
  }

  return (
    <div className="signin-signup">
      <div className="signin-signup-container">
        <p className="signin-signup-title">Créer un compte</p>
        <p className="signin-signup-subtitle">
          Bienvenue ! Entrez vos informations
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
            Créer un compte
          </button>
        </form>
        <div onClick={google} className="button-google">
          <img src="/google.png" alt="Bouton connection Google" />
          <p>Créer un compte avec Google</p>
        </div>

        <p className="signin-signup-footer">
          Vous avez déjà un compte ? <a href="/signin">Se connecter</a>
        </p>
      </div>

      <Toast show={showToast} type={typeToast} message={messageToast} />
    </div>
  )
}
