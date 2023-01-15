import React from 'react'

export default function InputForm({
  label,
  type,
  name,
  placeholder,
  length,
}: {
  label: string
  type: string
  name: string
  placeholder: string
  length: number
}) {
  const moveLabel = (e: React.MouseEvent<HTMLInputElement>) => {}

  return (
    <>
      <label className="label-form" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-form"
        minLength={length}
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        onClick={moveLabel}
      />
    </>
  )
}
