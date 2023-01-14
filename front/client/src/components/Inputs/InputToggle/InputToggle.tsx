import React from 'react'

export default function InputToggle({
		type,
		legend,
		choices,
	}: {
		type: string
		legend: string
		choices: Array<any>
	}) {
		return (
			<>
				<fieldset>
					<legend>{legend}</legend>
					<div>
						{choices.map((choice, i) => (
							<>
								{/* je dois changer id et htmlFor en string */}
								<input key={i} type={type} id={String(i)} name={choice.name} value={choice.value} />
								<label htmlFor={String(i)}>{choice.content}</label>
							</>
						))}
					</div>
				</fieldset>
			</>
		)
	}