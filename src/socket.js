import io from 'socket.io-client'

let socket

export const initSocket = () => {
  socket = io('http://localhost:8080')
  return socket
}

export const getSocket = () => socket
