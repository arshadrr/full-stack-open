import React, {useState, useEffect} from 'react';
import axios from 'axios';

function findMatchingPeople(people, pattern) {
  const patternRegExp = RegExp(`.*${pattern}.*`, 'i')
  return people.filter(person => patternRegExp.test(person.name))
}

const Filter = ({value, changeHandler}) => (
      <form>
        <div>
          filter shown with: <input name="filter" type="text" value={value} onChange={changeHandler} />
        </div>
      </form>
)

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

const People = ({peopleToShow}) => (
  <div>
  {peopleToShow.map(person => (
    <p key={person.name}>{person.name} {person.number}</p>
  ))}
  </div>
)

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(
    () => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPeople(response.data)
        })
    },
    []
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if(people.find(person => person.name === newName)){
      alert(`"${newName}" is already in the phonebook`)
      return
    }

    setPeople(people.concat(
      {
        name: newName,
        number: newNumber
      }
    ))
    setNewName('')
    setNewNumber('')
  }

  const peopleToShow = findMatchingPeople(people, newFilter)

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={newFilter} changeHandler={handleFilterChange} />

      <h2>Add new numbers</h2>
      <PersonForm
        submitHandler={addName}

        name={newName}
        nameChangeHandler={handleNameChange}

        number={newNumber}
        numberChangeHandler={handleNumberChange}
      />

      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} />
    </div>
  )
}

export default App;
