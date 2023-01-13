import React from 'react'
import { InputForm, Toast } from '../../components'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface formDataInterface {
	email: string
	pwd: string
}

export interface Ierror {
	isError: boolean
	message: string
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
			name: 'pwd',
			placeholder: 'Entrez votre mot de passe.',
		},
	]

	// const [formData, setFormData] = useState<formDataInterface>({
	// 	email: '',
	// 	pwd: '',
	// })

	const [showToast, setShowToast] = useState(false)
	const [typeToast, setTypeToast] = useState('')
	const [messageToast, setMessageToast] = useState('')

	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		const test = document.querySelectorAll('form')[0]

		let array = []
		for (let i = 0; i < 2; i++) {
			array.push((test[i] as HTMLInputElement).value)
		}

		const data = {
			email: array[0],
			pwd: array[1],
		}

		// setFormData(filsdepute)

		console.log(array)

		e.preventDefault()

		fetch('http://localhost:4557/api/login', {
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
		// 	return {
		// 		...prevState,
		// 		// @ts-ignore
		// 		[e.target.name]: e.target.value,
		// 	}
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
				<button type="submit">Se connecter</button>
			</form>
			<Toast show={showToast} type={typeToast} message={messageToast} />
		</>
	)
}
