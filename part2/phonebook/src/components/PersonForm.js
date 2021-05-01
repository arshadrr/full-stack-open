import React from 'react'

const PersonForm = (props) => {
  const {
    submitHandler,
    name,
    nameChangeHandler,
    number,
    numberChangeHandler 
  } = props

  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input name="name" type="text" value={name} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input name="number" type="tel" value={number} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm
