import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconLogout } from '../../../assets'

export default function UserInfoContainer({
  userSrc,
  userName,
  userMail,
}: {
  userSrc: string
  userName: string
  userMail: string
}) {
  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.removeItem('token')
    navigate('/signin')
  }

  return (
    <div>
      <div className="bar"></div>
      <div className="user-info-container">
        <button className="user-info-button">
          <img src={userSrc} alt="User picture" className="user-picture" />
          <div className="user-info">
            <p className="user-info__name">{userName}</p>
            <p className="user-info__email">{userMail}</p>
          </div>
        </button>
        <button className="logout" onClick={logout}>
          <IconLogout />
        </button>
      </div>
    </div>
  )
}

// button for modify user information / logout
// modify -> open modal
