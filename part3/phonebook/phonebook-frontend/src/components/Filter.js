import React from 'react'

const Filter = ({value, changeHandler}) => (
  <form>
    <div>
          filter shown with: <input name="filter" type="text" value={value} onChange={changeHandler} />
    </div>
  </form>
)

export default Filter
