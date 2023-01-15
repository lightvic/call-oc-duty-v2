import { useState } from 'react'
import { Toast } from '../../index'

export default function StatsContainer({
  title,
  price,
}: {
  title: string
  price: string
}) {
  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')

  const info = () => {
    setShowToast((showToast) => !showToast)
    setTypeToast('info')
    setMessageToast('En cours de développement.')
  }

  return (
    <>
      <div className="stats-container">
        <div className="stats-info">
          <img className="donut" src="/img.png" alt="" />
          <div className="stats-info-text">
            <p>{title}</p>
            <p>Status actuel</p>
            <p>{price}</p>
          </div>
        </div>
        <div onClick={info} className="stats-buttons">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <Toast show={showToast} type={typeToast} message={messageToast} />
    </>
  )
}
