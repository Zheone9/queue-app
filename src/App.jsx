import React, { useEffect, useState } from 'react'
import Homepage from './components/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import QueueList from './components/QueueList'
import StaffArea from './components/StaffArea'
import { getSocket, initSocket } from './socket'

initSocket()
const App = () => {
  const [user, setUser] = useState('')
  const [queueInformation, setQueueInformation] = useState(null)

  useEffect(() => {
    const socket = getSocket()
    if (socket) {
      socket.on('connect_error', (err) => {
        console.log(`connect_error due to: ${err.message}`)
      })
      socket.on('informacionCola', (data) => {
        setQueueInformation(data)
      })

      return () => {
        socket.off('informacionCola')
      }
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route
          path="/queue"
          element={
            <QueueList user={user} queueInformation={queueInformation} />
          }
        />
        <Route path="/staff" element={<StaffArea />} />
      </Routes>
    </Router>
  )
}

export default App
