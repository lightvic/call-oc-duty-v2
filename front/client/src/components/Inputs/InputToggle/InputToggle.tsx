import React from 'react'

export default function InputToggle({
		onChange,
		legend,
		choices,
	}: {
		onChange: any
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
							<input key={i} type="checkbox" id={i} name={choice.name} value={choice.value} />
							<label htmlFor={i}>{choice.content}</label>
						</>
					))}
					</div>
				</fieldset>










			
				<label className="label-form" htmlFor={name}>
					{label}
				</label>
				<input
					className="input-form"
					type="checkbox"
					name={name}
					onChange={onChange}
					id={name}
				/>
			</>
		)
	}