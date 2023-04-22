import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather';

const Detail = (props) => {
    console.log(props.site);
    return (
        <>
        <div className='col-sm'>
            <div className='row'>
                <div className='col-sm-3 details'>
                    <h5>Details</h5>
                    <p></p>
                </div>
                <div className='col-sm'>
                    <div className='row'>
                        <h5>Map</h5>
                        <Map />
                    </div>
                    <div className='row'>
                        <h5>Weather</h5>
                        {/* <Weather /> */}
                    </div>
                </div>
            </div>
            <div className='row'>
                <h5>comments</h5>
            </div>
        </div>
        <Map />

        </>
    )
};

export default Detail;