import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from '../../Inputs/InputForm/InputForm'
import jwt_decode from 'jwt-decode'
import { Toast } from '../../index'

export interface formDataInterface {
  name: string
  address: string
  town: string
  post_code: string
  users: string[]
}

export default function FlatsharesActionModal() {
  const inputs = [
    {
      label: 'Nom',
      type: 'text',
      name: '',
      placeholder: 'Call Oc Duty',
      length: 6,
    },
    {
      label: 'Ville',
      type: 'text',
      name: 'town',
      placeholder: 'Paris',
      length: 4,
    },
    {
      label: 'Adresse',
      type: 'text',
      name: 'address',
      placeholder: '27 rue du progès',
      length: 8,
    },
    {
      label: 'Code postal',
      type: 'number',
      name: 'post_code',
      placeholder: '75004',
      length: 4,
    },
    {
      label: 'Premier colocataire',
      type: 'text',
      name: 'email',
      placeholder: 'premier-coloc@gmail.com',
      length: 8,
    },
    {
      label: 'Deuxième colocataire',
      type: 'text',
      name: 'email',
      placeholder: 'deuxième-coloc@gmail.com',
      length: 8,
    },
  ]
  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const addFlatshares = (e: FormEvent<HTMLFormElement>) => {
    setShowToast(false)
    e.preventDefault()

    const form = document.querySelectorAll('form')[0]

    let info = []
    let email = []
    for (let i = 0; i < form.length; i++) {
      if (i < 4) {
        info.push((form[i] as HTMLInputElement).value)
      }
      if (i >= 4 && i < 6) {
        email.push((form[i] as HTMLInputElement).value)
      }
    }

    const currentUser = jwt_decode(sessionStorage.token)

    const data: formDataInterface = {
      name: info[0],
      address: info[1],
      town: info[2],
      post_code: info[3],
      users: [(currentUser as any).email, email[0], email[1]],
    }

    const submit = fetch('http://localhost:4557/api/newColoc', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: new Headers({
        Authorization: 'Bearer ' + token.token,
        'Content-type': 'application/json',
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.message) {
          if (json.message === 'invalid cred') {
            sessionStorage.removeItem('token')
            navigate('/signin')
          }
        }
        localStorage.setItem('coloc_uuid', json.coloc.uuid)
        navigate('/dashboard')
      })

    const array = info.concat(email)
    if (array.includes('')) {
      setShowToast(true)
      setTypeToast('error')
      setMessageToast('Tous les champs doivent être remplit')
    } else submit
  }

  return (
    <div className="coloc-modal">
      <form onSubmit={addFlatshares}>
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
        <button className="create-coloc" type="submit">
          Créer une nouvelle coloc
        </button>
      </form>
      <Toast show={showToast} type={typeToast} message={messageToast} />
    </div>
  )
}
