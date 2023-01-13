import React from 'react'
import { Toast } from '../../components'
import { InputForm } from '../../components'
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

  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const test = document.querySelectorAll('form')[0]
		const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const form = document.querySelectorAll('form')[0]

			let array = []
			for (let i = 0; i < 3; i++) {
		  	array.push((form[i] as HTMLInputElement).value)
    	}

		const data = {
			email: array[0],
			pseudo: array[1],
			pwd: array[2],
		}

		fetch('http://localhost:4557/api/signUp', {
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
        <button type="submit">S'inscrire</button>
      </form>

      <Toast show={showToast} type={typeToast} message={messageToast} />
    </>
  )
}}
