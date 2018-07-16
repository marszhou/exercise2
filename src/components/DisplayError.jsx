import React from 'react'

const DisplayError = ({ message }) => {
  return message ? (
    <div style={{ fontWeight: 'bold', color: 'red' }}>{message}</div>
  ) : null
}

export default DisplayError
