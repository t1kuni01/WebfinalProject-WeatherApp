import React, { useState } from 'react'
import axios from 'axios'

//Connect to our Api, here take some values, like location and pass that location into the url here that's going to be talking with the API.
// here by using some state, Data and location
function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

// This is API url here, in url we are passing the location.
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

// Implemented search function here, the arrow function here 
  const searchLocation = (event) => {

    //Using if condition for enter 
    if (event.key === 'Enter') {

      // Run axios and grab our url
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
    <div className="search">
      <input
        value={location}
        //Onchange function is using for to type:
        onChange={event => setLocation(event.target.value)}

        // For enter key, using onkeypress function:
        onKeyPress={searchLocation}
        placeholder='Enter Location for Weather'
        type="text" />
    </div>
    <div className="container">
      <div className="top">
        <div className="location">

          {/*location name code*/}
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {/*Temperature value code: in Celicus & Farenheit */}
          {data.main ? <h1>{Math.round((data.main.temp.toFixed()-32)*(5/9))}°C / {data.main.temp.toFixed()}°F</h1> : null}
        </div>
        {/* here how's the weather is, eg: clouds,clear*/}
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
   {/* Here data.name is used because i don't want to show anything in bottom or my output */}
      {data.name !== undefined &&
        <div className="bottom">

          {/* Here code for showing feels like in Celicus & Farenheit */}
          <div className="feels">
            {data.main ? <p className='bold'>{Math.round((data.main.feels_like.toFixed()-32)*(5/9))}°C / {data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>

             {/* Here code for showing Humidity */}
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>

           {/* Here code for wind speed */}
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      }


</div>
    </div>
  </div>
);
}
export default App;