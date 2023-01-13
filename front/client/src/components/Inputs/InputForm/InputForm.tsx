import React from 'react'

// export interface formDataInterface {
//   pseudo: string
//   password: string
// }

export default function InputForm({
  label,
  type,
  name,
  placeholder,
}: {
  label: string
  type: string
  name: string
  placeholder: string
}) {
  return (
    <>
      <label className="label-form" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-form"
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
      />
    </>
  )
}
