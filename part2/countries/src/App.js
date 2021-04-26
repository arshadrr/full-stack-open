import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import QueryForm from './components/QueryForm'

function App() {
  const [query, setQuery] = useState('')
  const [countryData, setCountryData] = useState([])

  const disableForm = countryData.length === 0 ? true : false

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }
  const handleCountryChange = (country) => {
    setQuery(country)
  }

  useEffect(
    () => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => setCountryData(response.data))
    },
    []
  )

  return (
    <div>
      <QueryForm query={query} queryChangeHandler={handleQueryChange} disabled={disableForm} />
      <Countries query={query} countryData={countryData} countryChangeHandler={handleCountryChange} />
    </div>
  )
}

export default App;
