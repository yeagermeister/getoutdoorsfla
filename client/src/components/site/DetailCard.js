import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather';
import Comments from '../../components/site/Comments';
const Detail = (props) => {
    // if(props.site.free) {
    //     return
    // }
    return (
        <>
        <div className='col-sm'>
            <div className='row'>
                <div className='col-sm-3 details'>
                    <p>{props.site.description}</p>    
                    <img src={props.site.imageURL} alt="Outdoor Imagery" />
                    {props.site.free && 
                        <p>This site has free admission!</p>
                    }
                    <p>Tags: 
                        {props.site.beach && <span className='tag'>Beach</span>}
                        {props.site.pets && <span className='tag'>Pet Friendly</span>}
                        {props.site.park && <span className='tag'>Community Park</span>}
                        {props.site.statepark && <span className='tag'>State Park</span>}
                        {props.site.spring && <span className='tag'>Spring</span>}
                        {props.site.swimmingHole && <span className='tag'>Swimming Hole</span>}
                        {props.site.camping && <span className='tag'>camping</span>}
                    </p>
                    <p>Average Rating:</p>
                    <p>Your Rating:</p>
                </div>
                <div className='col-sm'>
                    <div className='row'>
                        <h5>Map</h5>
                        <Map />
                    </div>
                    <div className='row'>
                        <h5>Weather</h5>
                        <Weather site={props.site}/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <Comments/>
                
            </div>
        </div>
        <Map />

        </>
    )
};

export default Detail;