import { Wrapper, Status, Spinner, ErrorComponent } from "@googlemaps/react-wrapper";
import { useRef, useEffect } from "react";
import React from 'react';
function MyMapComponent({ center, zoom }) {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });
    });

    return <div ref={ref} id="map" />;
}

function mapContainer(status) {
    switch (status) {
        case Status.LOADING:
            return <Spinner />;
        case Status.FAILURE:
            return <ErrorComponent />;
        case Status.SUCCESS:
            return (
                <Wrapper apiKey={process.env.GOOGLE_MAPS_API}>
                    <MyMapComponent />
                </Wrapper>
            );
    }
}


const Map = () => {
    return (
        <>
        <mapContainer>
            
        </mapContainer>
        </>
    )
};
export default Map;