import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather'

const Detail = (props) => {
    console.log(props.site);
    return (
        <>
        <div>
            <h4>test</h4>
            <Map></Map>
          <Weather></Weather>
        </div>
        </>
    )
};
export default Detail;