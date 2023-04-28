import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather';
import Comments from '../../components/site/Comments';
import StarRating from "../../components/site/Rating";

const Detail = (props) => {
    console.log(props.site);
  
    return (
      <>
        <div className=" mt-5 row">
          <div className=" col-md-4">
          <Comments site={props} />
            
          </div>
          <div className="col-md-4">
           
            <div className="row">
              <div className="col-md-12 rounded siteCard">
                <p>{props.site.description}</p>
                <img
                  className="w-30 imgthumbnail px-1"
                  src={props.site.imageURL}
                  alt={props.site.altText}
                />
                {props.site.free && <p>This site has free admission!</p>}
                <p className="siteCard">
                  Amenities:
                  {props.site.beach && <span className="tag">Beach</span>}
                  {props.site.pets && <span className="tag">Pet Friendly</span>}
                  {props.site.park && <span className="tag">Community Park</span>}
                  {props.site.statepark && <span className="tag">State Park</span>}
                  {props.site.spring && <span className="tag">Spring</span>}
                  {props.site.swimmingHole && (
                    <span className="tag">Swimming Hole</span>
                  )}
                  {props.site.camping && <span className="tag">camping</span>}
                </p>
                <p>Average Rating:</p>
                  Your Rating:
                  <StarRating site={props} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            
            <Map site={props.site} />
            <Weather site={props.site} />
          </div>
        </div>
      </>
    );
  };
  
  export default Detail;