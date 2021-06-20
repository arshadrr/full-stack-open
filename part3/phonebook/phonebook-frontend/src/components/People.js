import React from 'react'

const People = (props) => {
  const {
    peopleToShow,
    deleteHandler
  } = props

  return (
    <div>
      {peopleToShow.map(person => (
        <div key={person.id}>{person.name} {person.number}
          <button onClick={() => deleteHandler(person)}>X</button>
        </div>
      ))}
    </div>
  )
}

export default People
