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
            return <div>No site data</div>;
          }
        let center={lat: site.lat, lng: site.lon}
        console.log(site)
        
            return (
                <Wrapper apiKey={'AIzaSyAUPFIpucG-X584hME5DFs-4Yu28ny2vVk'}>
                    <MyMapComponent  center={center} zoom={12} />
                    <div>hello</div>
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

