import React from 'react'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

// export interface formDataInterface {
//   pseudo: string
//   password: string
// }

export default function InputForm({
  onChange,
  label,
  type,
  name,
  placeholder,
}: {
  label: string
  type: string
  name: string
  placeholder: string
  onChange: any
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
        onChange={onChange}
        id={name}
      />
    </>
  )
}
