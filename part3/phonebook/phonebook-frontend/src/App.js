import React, {useState, useEffect} from 'react';
import phonebook from './services/phonebook.js'

import People from './components/People.js'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import ErrorMessage from './components/ErrorMessage.js'
import StatusMessage from './components/StatusMessage.js'

function findMatchingPeople(people, pattern) {
  const patternRegExp = RegExp(`.*${pattern}.*`, 'i')
  return people.filter(person => patternRegExp.test(person.name))
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorTimerId, setErrorTimerId] = useState(null)
  const [statusTimerId, setStatusTimerId] = useState(null)

  useEffect(
    () => {
      phonebook.getAll()
        .then(initialPeople => {
          setPeople(initialPeople)
        })
    },
    []
  )

  const showErrorMessage = (message) => {
    if(errorTimerId !== null){
      window.clearTimeout(errorTimerId)
    }

    setErrorMessage(message)
    const timerId = window.setTimeout(
      () => setErrorMessage(null),
      5000
    )
    setErrorTimerId(timerId)
  }
  const showStatusMessage = (message) => {
    if(statusTimerId !== null){
      window.clearTimeout(statusTimerId)
    }

    setStatusMessage(message)
    const timerId = window.setTimeout(
      () => setStatusMessage(null),
      5000
    )
    setStatusTimerId(timerId)
  }

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
          showStatusMessage(`Updated ${returnedPerson.name}`)
        })
        .catch(err => {
          if(err.response.status === 404) {
            showErrorMessage(`Information on ${updatePerson.name} has already been removed from the server`)
            setPeople(
              people.filter(p => p.id !== updatePerson.id)
            )
          }
          else {
            throw err
          }
        })
    }
    else {
      phonebook
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          showStatusMessage(`Added ${returnedPerson.name}`)
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
      .then(response => {
        setPeople(
          people.filter(p => p.id !== person.id)
        )
        showErrorMessage(`Deleted ${person.name}`)
      })
  }

  const peopleToShow = findMatchingPeople(people, newFilter)

  return (
    <div>
      <h1>Phonebook</h1>

      <ErrorMessage message={errorMessage} />
      <StatusMessage message={statusMessage} />
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
