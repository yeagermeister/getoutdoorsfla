let latitude;
let longitude;


export function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log("Latitude: " + latitude + ", Longitude: " + longitude);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

export {latitude, longitude};
