import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather';

const Detail = (props) => {
    return (
        <>
        <div className='col-sm'>
            <div className='row'>
                <div className='col-sm-3 details'>
                    <p>{props.site.description}</p>    
                    <img src={props.site.imageURL} alt="Outdoor Imagery" />
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