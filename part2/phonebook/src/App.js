import React, {useState, useEffect} from 'react';
import phonebook from './services/phonebook.js'

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

const People = (props) => {
  const {
    peopleToShow,
    deleteHandler
  } = props

  return (
    <div>
    {peopleToShow.map(person => (
      <div key={person.id}>{person.name} {person.number} <button onClick={() => deleteHandler(person)}>X</button></div>
    ))}
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(
    () => {
      phonebook.getAll()
        .then(initialPeople => {
          setPeople(initialPeople)
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

  const addPerson = (event) => {
    event.preventDefault()
    const CONFIRM_UPDATE =`"${newName}" is already in the phonebook, replace old phone number with new one?` 
    let newPerson = {
      name: newName,
      number: newNumber
    }

    if(people.find(person => person.name === newPerson.name)){
      let existingPerson = people.find(person => person.name === newPerson.name)
      let updatePerson = {
        ...newPerson,
        id: existingPerson.id
      }

      if(!window.confirm(CONFIRM_UPDATE)){
      return
      }
      phonebook
        .updatePerson(updatePerson)
        .then(returnedPerson => {
          setPeople(people.map(person => person.id === returnedPerson.id ? returnedPerson : person))
        })
    }
    else {
      phonebook
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
        }) 
    }

    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (person) => {
    if(!window.confirm(`Delete ${person.name}`)){
      return
    }

    phonebook.deletePerson(person.id)
      .then(response => setPeople(
        people.filter(p => p.id !== person.id)
      ))
  }

  const peopleToShow = findMatchingPeople(people, newFilter)

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={newFilter} changeHandler={handleFilterChange} />

      <h2>Add new numbers</h2>
      <PersonForm
        submitHandler={addPerson}

        name={newName}
        nameChangeHandler={handleNameChange}

        number={newNumber}
        numberChangeHandler={handleNumberChange}
      />

      <h2>Numbers</h2>
      <People 
        peopleToShow={peopleToShow}
        deleteHandler={deletePerson}
      />
    </div>
  )
}

export default App;
