// import React, { useState, useEffect } from 'react';

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState(null);
//   let zipcode = data.findOneSite.zipcode
//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': process.env.API_KEY,
//         'X-RapidAPI-Host': process.env.API_HOST
//       }
//     };

//     fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${zipcode}`, options)
//       .then(response => response.json())
//       .then(data => {
//         setWeatherData({
//           cityName: data.location.name,
//           temperature: data.current.temp_f,
//           condition: data.current.condition.text,
//           iconUrl: data.current.condition.icon
//         });
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }, []);

//   if (error) {
//     return <div>There was an error: {error.message}</div>;
//   }

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <article id="weather" className="springs-container bg-custom ">
//         <h3 className="text-center">{weatherData.cityName}</h3>
//         <img id="icon" src={weatherData.iconUrl} alt="Weather icon"></img>
//         <span className="text-center">{weatherData.temperature}</span>
//         <span>{weatherData.condition}</span>
//       </article>
//     </div>
//   );
// };

// export default Weather;