import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef } from "react";
import React from 'react';

const Map = (props) => {
   

    
    function MyMapComponent({ center, zoom }) {
     console.log(center)
        const ref = useRef();
    
        useEffect(() => {
            new window.google.maps.Map(ref.current, {
                center,
                zoom,
            });
        }, [center, zoom]);
    
        return <div ref={ref} id="map" />;
    }

    function mapContainer(Status, site) {
        if (!site) {
            // Site is null or undefined, handle this case accordingly
            return <div></div>;
          }
        let center={lat: site.lat, lng: site.lon}
        console.log(site)
        
            return (
                <Wrapper apiKey={'AIzaSyCPmuYKoJgPVO2j1Z8L-lwQp89bKOOP8ic'}>
                    <MyMapComponent  center={center} zoom={12} />
                </Wrapper>
            );
        }

               
       
    



    return (
        <>
            {mapContainer(Status.SUCCESS, props.site)}
        </>
    )
};
export default Map;

