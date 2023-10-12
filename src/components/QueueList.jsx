import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getSocket } from '../socket'

const QueueList = ({ user, queueInformation }) => {
  const socket = getSocket()
  const [staffName, setStaffName] = useState(null)
  const [finalizedChat, setFinalizedChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const handleInputChange = (event) => {
    setInputMessage(event.target.value)
  }

  useEffect(() => {
    if (socket) {
      console.log('hay socket')
      socket.emit('join', user)
      socket.on('infoStaff', (data) => {
        console.log('data', data)
        console.log('se unio la vanessa')
        setStaffName(data)
      })

      socket.on('finalizeChat', (data) => {
        console.log('chat finalizado')
        setFinalizedChat(data)
      })
      socket.on('receiveMessageStaff', (data) => {
        console.log('staff mensaje:', data)
        setChatMessages((prevMessages) => [...prevMessages, data])
      })
      return () => {
        socket.off('infoStaff')
        socket.off('receiveMessageStaff')
        socket.off('finalizeChat')
      }
    }
  }, [])

  const handleSendMessage = () => {
    const message = inputMessage
    if (message.trim() === '') {
      return
    }
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        username: user,
        message,
        rol: 'client'
      }
    ])

    socket.emit('sendMessageStaff', message)
    console.log('se emitio', message)

    setInputMessage('')
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen flex-col  h-400">
        <div className="flex flex-col h-screen border-2 border-blue-500 rounded-lg m-4">
          <header className="bg-blue-500 text-white p-4">
            {staffName ? (
              <p>
                Ahora estas en turno con: <b>{staffName}</b>
              </p>
            ) : (
              <p>Esperando agente ...</p>
            )}
          </header>
          <div className="flex-1 overflow-auto p-4">
            {staffName && (
              <p className="text-sm text-center text-gray italic">
                {staffName} se ha unido al chat
              </p>
            )}

            {chatMessages.map((message, index) =>
              message.rol === 'staff' ? (
                <div
                  className="rounded-lg bg-blue-100 p-4 my-2 w-3/4 break-words"
                  key={index}
                >
                  <p className="font-bold">{message.username}</p>
                  <p>{message.message}</p>
                </div>
              ) : (
                <div
                  className="rounded-lg bg-green-100 p-4 my-2 w-3/4 ml-auto break-words"
                  key={index}
                >
                  <p className="font-bold">{message.username}</p>
                  <p>{message.message}</p>
                </div>
              )
            )}
          </div>

          {!staffName && queueInformation && (
            <p className="italic text-gray text-center text-sm">
              Hola {user}, su turno es el {queueInformation}
            </p>
          )}

          {finalizedChat && (
            <p className="italic text-gray text-center text-sm">
              Chat finalizado.
            </p>
          )}

          <div className="border-t-2 border-gray-200 px-4 pt-2 pb-4">
            <div className="relative">
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg pl-4 pr-10 py-2 border-2 border-blue-200 pr-20"
                placeholder="Escribe un mensaje..."
                onChange={handleInputChange}
                value={inputMessage}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-2 bg-blue-500 text-white"
                onClick={handleSendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
QueueList.propTypes = {
  user: PropTypes.string,
  queueInformation: PropTypes.string
}
export default QueueList
