import { InputForm, InputToggle, Toast } from '../../components'
import { useEffect, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
export interface formDataInterface {
  pseudo: string
  email: string
  pwd: string
}

export interface Ierror {
  isError: boolean
  message: string
}

export default function NewExpenseForm() {
  const colocUuid = sessionStorage.getItem('coloc_uuid')
  const token = JSON.parse(sessionStorage.token)
  const navigate = useNavigate()

  const [showToast, setShowToast] = useState(false)
  const [typeToast, setTypeToast] = useState('')
  const [messageToast, setMessageToast] = useState('')
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4557/api/modifyInfo/${colocUuid}`, {
      method: 'GET',
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
        setMembers(json.users)
      })
  }, [])
  const currentUser = jwt_decode(sessionStorage.token)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setShowToast(false)
    e.preventDefault()

    const form = document.querySelectorAll('form')[0]
    const l = form.length
    let array = []
    const participants = []
    for (let i = 0; i < l; i++) {
      const element = form[i] as HTMLInputElement
      if (element.value !== undefined) {
        if (element.type === 'radio') {
          if (element.checked) {
            array.push(element.value)
          }
        } else if (element.type === 'checkbox') {
          if (element.checked) {
            participants.push(element.value)
          }
        } else {
          array.push(element.value)
        }
      }
    }
    const data = {
      name: array[0],
      global_value: array[1],
      type: 'Achat',
      category: array[3],
      fix: array[2],
      coloc_uuid: colocUuid,
      other_participant: participants,
    }
    fetch('http://localhost:4557/api/newExpense', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: new Headers({
        Authorization: 'Bearer ' + token.token,
        'Content-type': 'application/json',
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        if (json.message === 'invalid cred') {
          sessionStorage.removeItem('token')
          navigate('/signin')
        }
        if (json.success) {
          location.reload()
        }
      })
  }

  const inputs = [
    {
      label: 'Nom',
      type: 'text',
      name: 'Name',
      placeholder: 'Barbecue, bières, ...',
      length: 4,
    },
    {
      label: 'Montant',
      type: 'number',
      name: 'value',
      placeholder: '10',
      length: 4,
    },
  ]
  const toggles = [
    {
      type: 'radio',
      legend: 'Type de dépense',
      choices: [
        {
          name: 'fix',
          value: 1,
          content: 'Récurrente',
        },
        {
          name: 'fix',
          value: 0,
          content: 'Ponctuelle',
        },
      ],
    },
    {
      type: 'radio',
      legend: 'Catégorie',
      choices: [
        {
          name: 'category',
          value: 'Courses',
          content: 'Courses',
        },
        {
          name: 'category',
          value: 'Charges/Loyer',
          content: 'Charges/Loyer',
        },
        {
          name: 'category',
          value: 'Soirees',
          content: 'Soirées',
        },
        {
          name: 'category',
          value: 'Abonnements',
          content: 'Abonnements',
        },
        {
          name: 'category',
          value: 'Necessites',
          content: 'Nécessités',
        },
        {
          name: 'category',
          value: 'Autres',
          content: 'Autres',
        },
      ],
    },
  ]
  console.log()
  const membersChoices = Array()
  ;(members as any).forEach(function (users: any) {
    if (users.uuid !== currentUser?.uuid) {
      membersChoices.push({
        name: users.pseudo,
        value: users.uuid,
        content: users.pseudo,
      })
    }
  })

  toggles.push({
    type: 'checkbox',
    legend: 'Participants',
    choices: membersChoices,
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="new-expense-inputs">
          {inputs.map((input, i) => (
            <InputForm
              key={i}
              label={input.label}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              length={input.length}
            />
          ))}
        </div>

        <div className="new-expense-toggle">
          {toggles.map((toggle, i) => (
            <InputToggle
              key={i}
              type={toggle.type}
              legend={toggle.legend}
              choices={toggle.choices}
            />
          ))}
        </div>

        <button className="new-expense-submit" type="submit">
          Ajouter une nouvelle dépense
        </button>
      </form>
      <Toast show={showToast} type={typeToast} message={messageToast} />
    </>
  )
}
