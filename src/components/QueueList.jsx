import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSocket } from '../socket'

const QueueList = ({ user, queueInformation }) => {
  const socket = getSocket()
  const [staffName, setStaffName] = useState(null)

  useEffect(() => {
    if (socket) {
      console.log('hay socket')
      socket.emit('join', user)
      socket.on('infoStaff', (data) => {
        console.log('data', data)
        console.log('se unio la vanessa')
        setStaffName(data)
      })

      return () => {
        socket.off('infoStaff')
      }
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <p>
        {queueInformation ? (
          <>
            Hola {user}, su turno es el {queueInformation}
            {staffName ? (
              <p>
                <b>{staffName}</b> se ha unido a la sala
              </p>
            ) : (
              <p>
                <b>Esperando al staff...</b>
              </p>
            )}
          </>
        ) : (
          <p>Loading</p>
        )}
      </p>
    </div>
  )
}
QueueList.propTypes = {
  user: PropTypes.string.isRequired,
  queueInformation: PropTypes.number
}
export default QueueList
