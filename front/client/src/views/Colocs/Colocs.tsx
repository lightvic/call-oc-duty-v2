import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FlatsharesActionModal, ModalContainer } from '../../components'

export default function Colocs() {
  const [colocs, setColocs] = useState<any[]>([])
  const [openModal, setOpenModal] = useState(false)

  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4557/api/colocSection/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token.token,
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.message === 'invalid cred') {
          sessionStorage.removeItem('token')
          navigate('/signin')
        }
        const colocs = json.colocs
        setColocs(colocs)
      })
  }, [])

  const addNewColoc = () => {
    setOpenModal((openModal) => !openModal)
  }

  const selectColoc = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.setItem('coloc_uuid', e.currentTarget.id)
    navigate('/dashboard')
  }

  return (
    <div className="coloc-container">
      <div className="user-colocs">
        <p className="coloc-title">Sélectionner ou créer une nouvelle coloc</p>
        {colocs &&
          colocs.map((coloc, i) => (
            <button
              className="coloc"
              onClick={selectColoc}
              key={i}
              id={coloc.uuid}
            >
              <img className="img-coloc" src="/img.png" alt="" />
              <p>{coloc.name}</p>
              <p>{coloc.town}</p>
              <p>{coloc.address}</p>
            </button>
          ))}
        <button className="new-coloc-button" onClick={addNewColoc}>
          Nouvelle coloc
        </button>
      </div>

      <div>
        <ModalContainer isOpen={openModal}>
          <FlatsharesActionModal />
        </ModalContainer>
      </div>
    </div>
  )
}
