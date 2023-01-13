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

export default function NewExpenseForm() {
	const inputs = [
		{
			label: 'Nom de la dépense',
			type: 'text',
			name: 'Name',
			placeholder: 'ex : barbecue du 10/06',
		},
		{
			label: 'Montant de la dépense',
			type: 'number',
			name: 'value',
			placeholder: 'ex : 54',
		},
		{
			label: 'Date de la dépense',
			type: 'date',
			name: 'date',
			placeholder: '',
		},
	]
	const toggles = [
		{
			label: 'Nom de la dépense',
			name: 'Name',
			choices: [
				{
					
				}
			]
		},
	]

	// const [formData, setFormData] = useState<formDataInterface>({
	// 	pwd: '',
	// 	pseudo: '',
	// 	email: '',
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
		// 	...prevState,
		// 	// @ts-ignore
		// 	[e.target.name]: e.target.value,
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
				<button type="submit">Enregistrer</button>
			</form>
			<Toast show={showToast} type={typeToast} message={messageToast} />
		</>
	)
}
