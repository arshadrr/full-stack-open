import axios from 'axios';

const BASE_URL = '/api/persons'

const getAll = () => {
  return axios
    .get(BASE_URL)
    .then(response => response.data)
}

const createPerson = (newPerson) => {
  return axios
    .post(BASE_URL, newPerson)
    .then(response => response.data)
}

const updatePerson = (person) => {
  return axios
    .put(`${BASE_URL}/${person.id}`, person)
    .then(response => response.data)
}

const deletePerson = (personId) => {
  return axios
    .delete(`${BASE_URL}/${personId}`)
}

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
}
