import React from 'react'
import {
  FlatsharesInfoContainer,
  ButtonWithIcon,
  UserInfoContainer,
} from '../index'
import jwt_decode from "jwt-decode"

export default function Menu() {
  const menuButtons = [
    {
      name: 'Notifications',
      href: '/notifications',
      icon: 'notifications',
    },
    {
      name: 'Calendrier',
      href: '/calendar',
      icon: 'calendar',
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
    },
    {
      name: 'Liste de courses',
      href: '/todolist',
      icon: 'todolist',
    },
    {
      name: 'Messages',
      href: '/chat',
      icon: 'chat',
    },
    {
      name: 'Cagnotte',
      href: '/pot',
      icon: 'pot',
    },
  ]

  const windowLocation = window.location.pathname.split('/')[1]
  console.log(windowLocation)
  const currentUser = jwt_decode(sessionStorage.token)

  return (
    <div className="menu-container">
      <div>
        <FlatsharesInfoContainer flatsharesName={'Call Oc Duty'} />

        <div className="menu-buttons">
          {menuButtons.map((button, i) => (
            <ButtonWithIcon
              key={i}
              name={button.name}
              href={button.href}
              icon={button.icon}
              isSelected={windowLocation == button.icon ? true : false}
            />
          ))}
        </div>
      </div>

      <UserInfoContainer
        userSrc={'/img.jpeg'}
        userName={(currentUser as any).pseudo}
        userMail={(currentUser as any).email}
      />
    </div>
  )
}

// menu on the left of the page

// Use FlatsharesInfoContainer
// Use ButtonWithIcon component
// Use UserInfoContainer
