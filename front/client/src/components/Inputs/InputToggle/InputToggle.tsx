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
    <div>
      <p className="input-toggle-title">{legend}</p>
      <div className="input-toggle-container">
        {choices.map((choice, i) => (
          <div>
            <input
              key={i}
              type={type}
              id={String(i)}
              name={choice.name}
              value={choice.value}
              className="input-toggle-input"
            />
            <label htmlFor={String(i)}>{choice.content}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
