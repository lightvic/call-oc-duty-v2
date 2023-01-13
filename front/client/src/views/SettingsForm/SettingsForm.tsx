import React from 'react'
import { InputForm } from '../../components'
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";

export interface formDataInterface {
	pseudo: string,
	email: string,
	password: string
}


export default function SettingsForm()
{
	const emailInput = {
		labelClassName: "label",
		inputId: "email",
		labelContent: "Email",
		inputClassName: "inputSign",
		inputType: "email",
		inputName: "email",
		inputPlaceHolder: "ex : jean.martin@bidule.com"
	};
	const pseudoInput ={
		labelClassName: "label",
		inputId: "pseudo",
		labelContent: "Pseudo",
		inputClassName: "inputSign",
		inputType: "text",
		inputName: "pseudo",
		inputPlaceHolder: "JeanMartin90"
	};
	const pwdInputs = [
		
		{
			labelClassName: "label",
			inputId: "password",
			labelContent: "Mot de passe",
			inputClassName: "inputSign",
			inputType: "password",
			inputName: "password",
			inputPlaceHolder: "Conseil : 8 caractères min" 
		},
		{
			labelClassName: "label",
			inputId: "confirmPassword",
			labelContent: "Confirmer le mot de passe",
			inputClassName: "inputSign",
			inputType: "password",
			inputName: "confirmPassword",
			inputPlaceHolder: "Confirmez votre mot de passe" 
		}
	]
	const profilePicInput = {
		labelClassName: "label",
		inputId: "profilePic",
		labelContent: "Photo de profil",
		inputClassName: "inputSign",
		inputType: "image",
		inputName: "profilePic",
		inputPlaceHolder: "" 
	};

	const [formData, setFormData] = useState<formDataInterface>({password: "", pseudo: "", email: ""})
	const handleChange = (e: ChangeEvent) => {
        setFormData(prevState => {
            return {
                ...prevState,
                // @ts-ignore
                [e.target.name]: e.target.value
            }
        })
    }

	return (
		<>
			<form>
				<InputForm labelClassName={emailInput.labelClassName} inputId={emailInput.inputId} labelContent={emailInput.labelContent} inputClassName={emailInput.inputClassName} inputType={emailInput.inputType} inputName={emailInput.inputName} inputPlaceHolder={emailInput.inputPlaceHolder} onChange={handleChange} />
				<button type="submit">Valider</button>
			</form>
			<form>
				<InputForm labelClassName={pseudoInput.labelClassName} inputId={pseudoInput.inputId} labelContent={pseudoInput.labelContent} inputClassName={pseudoInput.inputClassName} inputType={pseudoInput.inputType} inputName={pseudoInput.inputName} inputPlaceHolder={pseudoInput.inputPlaceHolder} onChange={handleChange} />
				<button type="submit">Valider</button>
			</form>
			<form>
				{pwdInputs.map((pwdInput, i) => (
					<InputForm key={i} labelClassName={pwdInput.labelClassName} inputId={pwdInput.inputId} labelContent={pwdInput.labelContent} inputClassName={pwdInput.inputClassName} inputType={pwdInput.inputType} inputName={pwdInput.inputName} inputPlaceHolder={pwdInput.inputPlaceHolder} onChange={handleChange} />
				))}
				<button type="submit">Valider</button>
			</form>
			<form>
				<InputForm labelClassName={profilePicInput.labelClassName} inputId={profilePicInput.inputId} labelContent={profilePicInput.labelContent} inputClassName={profilePicInput.inputClassName} inputType={profilePicInput.inputType} inputName={profilePicInput.inputName} inputPlaceHolder={profilePicInput.inputPlaceHolder} onChange={handleChange} />
				<button type="submit">Valider</button>
			</form>
			<h3>DANGER</h3>
			<button type="submit">Supprimer le compte</button>
		</>
	)
}
