const axios = require('axios');

// Set your API key and host
const apiKey = process.env.WEATHER_API
const host = 'weatherapi-com.p.rapidapi.com';

// Set the endpoint and query parameters
const endpoint = '/current.json';
const query = 'q=London'; // Replace with the desired location

// Set the request headers
const headers = {
  'X-RapidAPI-Host': host,
  'X-RapidAPI-Key': apiKey
};

// Make the GET request using Axios
axios.get(`https://${host}${endpoint}?${query}`, { headers })
  .then(response => {
    // Handle the response data
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

  export {iconUrl, cityName, temperature, condition};