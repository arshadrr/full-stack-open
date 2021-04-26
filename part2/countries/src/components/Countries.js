import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WEATHERSTACK_API_KEY = process.env.REACT_APP_API_KEY

const STATUS_MESSAGES = {
  LOADING: 'Fetching country data, sit tight.',
  READY: 'Enter a query to filter countries by.',
  FAIL: 'Error, failed to fetch country data.',
  VAGUE: 'Too many matches. Make the query more specific.',
  FOUND: '',
  NONE: 'No matches found.'
}

function findCountries(query, countryData) {
  const pattern = RegExp(`.*${query}.*`, 'i')
  return countryData.filter(country => pattern.test(country.name))
}

function StatusMessage({message}) {
  return (
    <div>{message}</div>
  )
}

function Country({name, countryChangeHandler}) {
  return <div>{name} <button onClick={() => countryChangeHandler(name)}>show</button></div>
}

function WeatherInformation({weatherData}) {
  return (
    <div>
      <h2>Weather in {weatherData.location.name}</h2>
      <div><b>temperature:</b> {weatherData.current.temperature} Celsius</div>
      <img src={weatherData.current.weather_icons[0]} alt={`Icon representing ${weatherData.current.weather_descriptions[0]} weather`}></img>
      <div><b>Wind:</b> {weatherData.current.wind_speed} mph towards the {weatherData.current.wind_dir}</div>
    </div>
  )
}

function DetailedCountry({country}) {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(
    () => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${country.name}`)
        .then(
          response => setWeatherData(response.data)
        )
    },
    []
  )

  let weatherInfo
  if(weatherData === null) {
    weatherInfo = <div>Loading weather information.</div>
  } else {
    weatherInfo = <WeatherInformation weatherData={weatherData} />
  }

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {
          country.languages.map(
            language => <li key={language.name}>{language.name}</li>
          )
        }
      </ul>
    <img src={country.flag} alt={`Flag of ${country.name}`} width="100px" />
    {weatherInfo}
    </>
  )
}

const Countries = (props) => {
  const {
    query,
    countryData,
    countryChangeHandler
  } = props
  // status message to show. uninitialized, will be determined in the following
  // if blocks
  let status_message
  // by default an empty array indicating that no countries are to be rendered.
  // if the query and countryData work out, replaces with an actual list of
  // countries to be rendered
  let filteredCountries = []

  if (countryData === null) {
    status_message = STATUS_MESSAGES.FAIL
  }
  else if (countryData.length === 0) {
    status_message = STATUS_MESSAGES.LOADING
  }
  else if (query.length === 0) {
    status_message = STATUS_MESSAGES.READY
  } else {
    filteredCountries = findCountries(query, countryData)

    if (filteredCountries.length > 10) {
      status_message = STATUS_MESSAGES.VAGUE
      filteredCountries = []
    } else if (filteredCountries.length > 0) {
      status_message = STATUS_MESSAGES.FOUND
    } else {
      status_message = STATUS_MESSAGES.NONE
    }
  }

  let results
  if (filteredCountries.length === 1) {
    results = <DetailedCountry country={filteredCountries[0]} />
  } else {
    results = filteredCountries.map(
      country => <Country key={country.name} name={country.name} countryChangeHandler={countryChangeHandler} />
    )
  }

  return (
    <div>
      <StatusMessage message={status_message} />
      {results}
    </div>
  )
}

export default Countries
