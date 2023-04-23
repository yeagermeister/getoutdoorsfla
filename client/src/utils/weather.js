import axios from 'axios';

// Set your API key and host
const apiKey = '4a9c9446f7msh1bdc5860de01184p135179jsne7c04d560051'; // Replace with your actual API key
const host = 'weatherapi-com.p.rapidapi.com/';
const endpoint = 'forecast.json?q=';

// Set the request headers
const headers = {
  'X-RapidAPI-Host': host,
  'X-RapidAPI-Key': apiKey
};

// Initialize the variables we need to pass
let temperature = '';
let condition = '';
let iconUrl = '';

export async function getWeather(zipcode) {
// Make the GET request using Axios
try {
const response = await axios.get(`https://${host}${endpoint}${zipcode}`, { headers });
    temperature = response.data.current.temp_f;
    condition = response.data.current.condition.text;
    iconUrl = response.data.current.condition.icon;
    return iconUrl;
  } catch(error) {
    // Handle any errors
    console.error('Error:', error);
  };
}
console.log(iconUrl)
export {temperature, condition, iconUrl}