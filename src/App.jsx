import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'
import './App.css'
import React from 'react'

function App() {
  const [weather, setWeather] = useState(null)
  const [weather5Days, setWeather5Days] = useState(null)
  const inputRef = useRef()

  async function searchCity() {
    const city = inputRef.current.value
    const key = "9bead99fe0d646608c33a435f14cc22e"
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const apiData = await axios.get(url)
      const apiData5Days = await axios.get(url5Days)

      setWeather(apiData.data)
      setWeather5Days(apiData5Days.data)
    } catch (error) {
      alert("Cidade não encontrada!")
    }
  }

  return (
    <div className='container'>
      <h1>GMFF Previsão do Tempo</h1>
      <input ref={inputRef} type='text' placeholder='Digite o nome da cidade' />
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App