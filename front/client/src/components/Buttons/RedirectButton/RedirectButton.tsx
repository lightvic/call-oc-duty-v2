import React from 'react'

export default function RedirectButton({
  src,
  name,
  type,
}: {
  src: string
  name: string
  type: string
}) {
  const clasName = `redirect-button redirect-button--${type}`
  return (
    <a className={clasName} href={src}>
      {name}
    </a>
  )
}

// Button for redirect to an other page
