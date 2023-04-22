import React, { useState, useEffect } from 'react';

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  let zipcode = props.site.zipcode
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '4a9c9446f7msh1bdc5860de01184p135179jsne7c04d560051',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${zipcode}`, options)
      .then(response => response.json())
      .then(data => {
        setWeatherData({
            
          cityName: data.location.name,
          temperature: data.current.temp_f,
          condition: data.current.condition.text,
          iconUrl: data.current.condition.icon
        });
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>There was an error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <article id="weather" className="springs-container bg-custom ">
        <h3 className="text-center">{weatherData.cityName}</h3>
        <img id="icon" src={weatherData.iconUrl} alt="Weather icon"></img>
        <span className="text-center">{weatherData.temperature}</span>
        <span>{weatherData.condition}</span>
      </article>
    </div>
  );
};

export default Weather;