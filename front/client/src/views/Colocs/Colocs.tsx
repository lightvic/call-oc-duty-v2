import { stringify } from 'querystring'
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
        console.log(colocs)
      })
  }, [])

  const addNewColoc = () => {
    console.log('click')
    setOpenModal((openModal) => !openModal)
  }

  return (
    <>
      {colocs.map((coloc, i) => (
        <button key={i} id={coloc.uuid}>
          <p>{coloc.address}</p>
          <p>{coloc.town}</p>
          <p>{coloc.post_code}</p>
        </button>
      ))}
      <button onClick={addNewColoc}>Nouvelle coloc</button>
      <div>
        <ModalContainer isOpen={openModal}>
          <FlatsharesActionModal />
        </ModalContainer>
      </div>
    </>
  )
}
