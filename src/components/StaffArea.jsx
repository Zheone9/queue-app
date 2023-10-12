import React, { useEffect, useState } from 'react'
import { getSocket } from '../socket'

const StaffArea = () => {
  const socket = getSocket()
  const [client, setClient] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const handleInputChange = (event) => {
    setInputMessage(event.target.value)
  }

  useEffect(() => {
    if (socket) {
      console.log('hay socket')
      socket.emit('joinStaff', 'Vanessa')
      socket.on('firstClient', (data) => {
        console.log('cliente', data)
        setClient(data)
        console.log(data)
      })
      socket.on('receiveMessageClient', (data) => {
        console.log('cliente mensaje:', data)
        setChatMessages((prevMessages) => [...prevMessages, data])
      })
    }
    return () => {
      socket.off('firstClient')
      socket.off('receiveMessageClient')
    }
  }, [])

  const handleNextClient = () => {
    socket.emit('nextClient')
    setChatMessages([])
  }

  const handleSendMessage = () => {
    const message = inputMessage
    if (message.trim() === '') {
      return
    }
    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        username: 'Vanessa',
        message,
        rol: 'staff'
      }
    ])

    socket.emit('sendMessageClient', message)
    setInputMessage('')

    console.log('se emitio', message)
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center h-screen flex-col w-400 ">
        <h1> Login as: Vanessa Gómez</h1>
        {!client && <p>Esperando al cliente...</p>}

        <div className="flex flex-col h-screen border-2 border-blue-500 rounded-lg m-4">
          <header className="bg-blue-500 text-white p-4">
            {client && (
              <p>
                Ahora estas en turno con: <b>{client}</b>
              </p>
            )}
          </header>

          <div className="flex-1 overflow-auto p-4">
            {chatMessages.map((message, index) =>
              message.rol === 'client' ? (
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

          <div className="border-t-2 border-gray-200 px-4 pt-2 pb-4">
            <div className="relative">
              <input
                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg pl-4 pr-10 py-2 border-2 border-blue-200"
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

      <div className=" flex flex-col gap-2 pt-7">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => {
            handleNextClient()
          }}
        >
          Next Client
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
          Generate Welcome
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">
          Generate Goodbye
        </button>
      </div>
    </div>
  )
}

export default StaffArea
