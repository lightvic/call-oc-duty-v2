import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from '../../Inputs/InputForm/InputForm'
import jwt_decode from 'jwt-decode'

// export interface formDataInterface extends Record<string, string> {
export interface formDataInterface {
  name: string
  address: string
  town: string
  post_code: string
  users: string[]
}

// post_code doit etre string et pas un int

export default function FlatsharesActionModal() {
  const inputs = [
    {
      label: 'Nom',
      type: 'text',
      name: '',
      placeholder: 'Call Oc Duty',
    },
    {
      label: 'Ville',
      type: 'text',
      name: 'town',
      placeholder: 'Paris',
    },
    {
      label: 'Adresse',
      type: 'text',
      name: 'address',
      placeholder: '27 rue du progès',
    },
    {
      label: 'Code postal',
      type: 'int',
      name: 'post_code',
      placeholder: '75004',
    },
    {
      label: 'Colocataire 1',
      type: 'text',
      name: 'email',
      placeholder: 'Coloc1',
    },
    {
      label: 'Colocataire 2',
      type: 'text',
      name: 'email',
      placeholder: 'Coloc2',
    },
    {
      label: 'Colocataire 3',
      type: 'text',
      name: 'email',
      placeholder: 'Coloc3',
    },
    {
      label: 'Colocataire 4',
      type: 'text',
      name: 'email',
      placeholder: 'Coloc4',
    },
  ]

  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const addFlatshares = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = document.querySelectorAll('form')[0]

    let info = []
    let email = []
    for (let i = 0; i < form.length; i++) {
      if (i < 4) {
        info.push((form[i] as HTMLInputElement).value)
      }
      if (i >= 4 && i < 8) {
        email.push((form[i] as HTMLInputElement).value)
      }
    }

    const currentUser = jwt_decode(sessionStorage.token)

    const data: formDataInterface = {
      name: info[0],
      address: info[1],
      town: info[2],
      post_code: info[3],
      users: [
        (currentUser as any).email,
        email[0],
        email[1],
        email[2],
        email[3],
      ],
    }

    fetch('http://localhost:4557/api/newColoc', {
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
        const coloc_uuid = json.coloc.uuid
        navigate(`/dashboard/${coloc_uuid}`)
      })
  }

  return (
    <>
      <form onSubmit={addFlatshares}>
        {inputs.map((input, i) => (
          <InputForm
            key={i}
            label={input.label}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
          />
        ))}
        <button type="submit">Save</button>
      </form>
    </>
  )
}

// Create flatshares || Modify flathsares
