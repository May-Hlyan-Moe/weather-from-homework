import React, {useState} from "react";
import axios from "axios";

export default function App() {
    let [temperature, setTemperature] = useState();
    let [humidity, setHumidity] = useState();
    let [wind, setWind] = useState();
    let [description, setDescription] = useState();
    let [city, setCity] = useState();
    let [icon, setIcon] = useState();
    let [message, setMessage] = useState();
  
    function showHumidity(response) {
      setHumidity(response.data.temperature.humidity);
    }
  
    function showTemperature(response) {
      setTemperature(response.data.temperature.current);
      console.log(response.data);
    }
  
    function showWind(response) {
      setWind(response.data.wind.speed);
    }
  
    function showDescription(response) {
      setDescription(response.data.condition.description);
    }
  
    function showIcon(response) {
      setIcon(response.data.condition.icon_url);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setMessage(
        <ul>
          <li>Temperature: {Math.round(temperature)}° C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}% </li>
          <li>Wind: {wind}km/h</li>
          <li>
            <img src={icon} alt="clear" />
          </li>
        </ul>
      );
    }
  
    function updateCity(event) {
      //console.log(event.target.value);
      setCity(event.target.value);
    }
  
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e8b0a10cf3eacat9055e9544c4bb244o&units=metric`;
    axios.get(url).then(showTemperature);
    axios.get(url).then(showHumidity);
    axios.get(url).then(showWind);
    axios.get(url).then(showDescription);
    axios.get(url).then(showIcon);
  
    return (
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input type="search" onChange={updateCity} />
          <input type="submit" value="Search" />
        </form>
        <div>{message}</div>
      </div>
    );
  }
  