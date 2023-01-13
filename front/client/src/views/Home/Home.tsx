import { ButtonAction, Menu, ModalContainer } from '../../components'

export default function Home() {
  return (
    <div>
      <Menu />

      <ModalContainer isOpen={false}>
        <ButtonAction button={'button'} />
      </ModalContainer>
    </div>
  )
}
