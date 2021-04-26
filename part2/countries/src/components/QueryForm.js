import React from 'react'

function Input(props) {
  const {
    value,
    changeHandler,
    disabled
  } = props

  if (disabled === true) {
    return <input type="text" value={value} disabled />
  } else {
    return <input type="text" value={value} onChange={changeHandler} />
  }
}

function QueryForm(props) {
  const {
    query,
    queryChangeHandler,
    disabled
  } = props

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Enter query <Input value={query} changeHandler={queryChangeHandler} disabled={disabled} />
    </label>
    </form>
  )
}

export default QueryForm
