import React from 'react'
import {
  IconCalendar,
  IconChat,
  IconPot,
  IconStats,
  IconTodo,
} from '../../../assets'
import IconNotification from '../../../assets/IconNotification'

export default function ButtonWithIcon({
  name,
  href,
  icon,
  isSelected,
}: {
  name: string
  href: string
  icon: string
  isSelected: boolean
}) {
  let iconComponent

  const color = isSelected ? 'var(--main-color)' : '#000'
  const className = isSelected ? 'button-icon-link--active' : 'button-icon-link'

  switch (icon) {
    case 'calendar':
      iconComponent = <IconCalendar color={color} />
      break
    case 'chat':
      iconComponent = <IconChat color={color} />
      break
    case 'notifications':
      iconComponent = <IconNotification color={color} />
      break
    case 'pot':
      iconComponent = <IconPot color={color} />
      break
    case 'dashboard':
      iconComponent = <IconStats color={color} />
      break
    case 'todolist':
      iconComponent = <IconTodo color={color} />
      break
    default:
      break
  }

  return (
    <a className="button-icon-container" href={href}>
      <div className="icon-container">{iconComponent}</div>
      <p className={className}>{name}</p>
    </a>
  )
}

// button <a> <a/> with icon on the left (menu)
