import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Homepage = ({ setUser }) => {
  const handleNameChange = (event) => {
    setUser(event.target.value)
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="mb-4">
        <label
          htmlFor="input"
          className="block text-gray-700 text-sm font-bold mb-2 pl-2"
        >
          Nombre
        </label>
        <input
          type="text"
          id="input"
          onChange={handleNameChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Escribe aquí..."
        />
      </div>
      <Link to="/queue">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Ingresar
        </button>
      </Link>
    </div>
  )
}
Homepage.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default Homepage
