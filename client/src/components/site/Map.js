import { Wrapper, Status, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";
import React from 'react';
function MyMapComponent({ center, zoom }) {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    }, [center, zoom]);

    return <div ref={ref} id="map" />;
}

// function mapContainer(status) {
//     switch (status) {
//         case Status.LOADING:
//             return <Spinner />;
//         case Status.FAILURE:
//             return <ErrorComponent />;
//             case Status.SUCCESS:
//                 return (
//                     <Wrapper apiKey={process.env.GOOGLE_MAPS_API}>
//                         <MyMapComponent center={{lat: data.findOneSite.lat, lng: data.findOneSite.lon}} zoom={12} />
//                     </Wrapper>
//                 );
//                 default:
//             return <Spinner />;
    // }
// }



const Map = () => {
    return (
        <>
            {/* {mapContainer(Status.SUCCESS)} */}
        </>
    )
};
export default Map;

