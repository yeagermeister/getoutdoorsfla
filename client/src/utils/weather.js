const axios = require('axios');

// Set your API key and host
const apiKey = process.env.WEATHER_API; // Replace with your actual API key
const host = 'weatherapi-com.p.rapidapi.com/forecast.json?q=';

// Set the endpoint and query parameters
const endpoint = '/current.json';
// const query = 'q=London'; // Replace with the desired location

// Set the request headers
const headers = {
  'X-RapidAPI-Host': host,
  'X-RapidAPI-Key': apiKey
};

// Initialize the variables we need to pass
let cityName = '';
let temperature = '';
let condition = '';
let iconUrl = '';

export function getWeather(zipcode) {
// Make the GET request using Axios
axios.get(`https://${host}${endpoint}${zipcode}`, { headers })
  .then(response => {
    cityName = response.location.name;
    temperature = response.current.temp_f;
    condition = response.current.condition.text;
    iconUrl = response.current.condition.icon;
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });
}

export {cityName, temperature, condition, iconUrl}