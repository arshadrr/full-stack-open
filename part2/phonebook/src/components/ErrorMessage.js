import React from 'react'

const ErrorMessage = ({message}) => {
  const errorMessageStyles = {
    border: 'solid red',
    padding: 10,
    marginBottom: 10
  }
  
  if(message === null){
    return null
  }

  return (
    <div style={errorMessageStyles}>
      {message}
    </div>
  )
}

export default ErrorMessage
