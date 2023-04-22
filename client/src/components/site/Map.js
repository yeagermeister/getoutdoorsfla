import { Wrapper, Status } from "@googlemaps/react-wrapper";
require('dotenv').config();

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
import React from 'react';
