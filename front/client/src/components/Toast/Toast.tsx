import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Toast({
  type,
  message,
  show,
}: {
  type: string
  message: string
  show: boolean
}) {
  useEffect(() => {
    if (show) {
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warn':
          toast.warn(message)
          break
        case 'info':
          toast.info(message)
          break
      }
    }
  })

  return <ToastContainer />
}
