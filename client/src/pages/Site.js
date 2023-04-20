import React from "react";
import SiteCard from '../SiteCard';
import Map from '../Map';
import Weather from '../Weather';

const Site = () => {
    return (
        <>
        <div>
            <h2>Site Placeholder</h2>
        </div>
            <SiteCard>
                <Map></Map>
                <Weather></Weather>
            </SiteCard>
    </>
    )
}

export default Site;
