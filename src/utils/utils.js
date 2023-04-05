let latitude;
let longitude;


export function getLocation() {
    if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            },
            function(error) {
                if (error.code === error.PERMISSION_DENIED) {
                    alert('Please turn on location services for this site to function.  We are not sharing your coordinates with Big Brother.')
                }
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

export {latitude, longitude};
