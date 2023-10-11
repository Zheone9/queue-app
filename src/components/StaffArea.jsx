import React, { useEffect, useState } from 'react'
import { getSocket } from '../socket'

const StaffArea = () => {
  const socket = getSocket()
  const [client, setClient] = useState(null)
  useEffect(() => {
    if (socket) {
      console.log('hay socket')
      socket.emit('joinStaff', 'Vanessa')
      socket.on('firstClient', (data) => {
        console.log('cliente', data)
        setClient(data)
        console.log(data)
      })
    }
    return () => {
      socket.off('firstClient')
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1> StaffArea, bienvenida vanessa</h1>
      {!client && <p>Esperando al cliente...</p>}
      {client && (
        <p>
          Ahora estas en turno con: <b>{client}</b>
        </p>
      )}
    </div>
  )
}

export default StaffArea
