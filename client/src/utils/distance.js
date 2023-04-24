import axios from 'axios';

// Define your API key and base URL for the Google Maps API
const apiKey = 'AIzaSyCPmuYKoJgPVO2j1Z8L-lwQp89bKOOP8ic';
const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';

// Define the latitude and longitude coordinates for origin and destination
// const originLat = 37.4224764;
// const originLng = -122.0842499;
// const destinationLat = 37.331836;
// const destinationLng = -122.029097;





export async function getDistance(originLat, originLng, destinationLat, destinationLng) {

// Define the parameters for the API request
const params = {

    origins: `${originLat},${originLng}`,
    destinations: `${destinationLat},${destinationLng}`
};
// Make a GET request using Axios
axios.get('http://localhost:3001/proxy', { params })
  .then(response => {
    // Handle the response
    const data = response.data;
    if (data.status === 'OK') {
      // Extract the distance information from the response
      const distance = data.rows[0].elements[0].distance.text;
      console.log(`Distance between origin and destination: ${distance}`);
      return distance;
    } else {
      console.error('Failed to retrieve distance information:', data.error_message);
    }
  })
  .catch(error => {
    console.error('Failed to connect to Google Maps API:', error);
  });
}