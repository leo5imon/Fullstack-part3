import { useState, useEffect } from 'react'
import './assets/Index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name.includes(newName))) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const req = persons.find(person => person.name === newName)
        const personsObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(req.id, personsObject).then(returnedObject => {
            setPersons(persons.map((person) => (person.id === req.id ? returnedObject : person)))
            setNewName('')
            setNewNumber('')
            setSuccessMessage("Number has been changed")
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)})
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } else {
        return null
      }} else {
        const personsObject = {
          name: newName,
          number: newNumber
        }
        personService
          .create(personsObject)
          .then(returnedObject => {
            setPersons(persons.concat(returnedObject))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`${newName} has been added`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)})
      }
    }

  const handleDelete = (personId) => {
    const req = persons.find(person => person.id === personId);
    if (window.confirm("Delete " + req.name + " ?")) {
      personService
        .remove(personId)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personId))
        })
        }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter value={newFilter} handle={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} valueName={newName} handleName={handleNameChange} valueNumber={newNumber} handleNumber={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} onDelete={handleDelete}/>
    </div>
  )
}

export default App