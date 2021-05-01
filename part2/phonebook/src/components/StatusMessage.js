import React from 'react'

const StatusMessage = ({message}) => {
  const statusMessageStyles = {
    border: 'solid green',
    padding: 10,
    marginBottom: 10
  }
  if(message === null){
    return null
  }

  return (
    <div style={statusMessageStyles}>
      {message}
    </div>
  )
}

export default StatusMessage
