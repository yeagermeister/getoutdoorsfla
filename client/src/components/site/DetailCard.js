import React from 'react';
import Map from '../../components/site/Map';
import Weather from '../../components/site/Weather';
import Comments from '../../components/site/Comments';
import StarRating from "../../components/site/Rating";
import Auth from '../../utils/auth'

const Detail = (props) => {
    console.log(props.site);
  
    console.log(props.site.ratings)
    let length = props.site.ratings.length;
    console.log(length, "length")
    let ratingsArr = props.site.ratings;
    let total = 0
    ratingsArr.forEach(e => {
        total = total + e.rating
    });
    let average = total/length;
    console.log(average)
    return (
      <>
        <div className=" mt-5 row">
          <div className=" col-md-4">
          <Comments site={props} />
            
          </div>
          <div className="col-md-4">
           
            <div className="row justify-content-center">
              <div className="col-md-12 flex  rounded siteCard">
                <p>{props.site.description}</p>
                <img
                  className="w-30 mx-1 imgthumbnail px-1"
                  src={props.site.imageURL}
                  alt={props.site.altText}
                />
                {props.site.free && <p>This site has free admission!</p>}
                <p className="siteCard amenitay">
                  Amenities:
                  {props.site.beach && <span className="tag">Beach</span>}
                  {props.site.pets && <span className="tag">Pet Friendly</span>}
                  {props.site.park && <span className="tag">Community Park</span>}
                  {props.site.statepark && <span className="tag">State Park</span>}
                  {props.site.spring && <span className="tag">Spring</span>}
                  {props.site.swimmingHole && (
                    <span className="tag">Swimming Hole</span>
                  )}
                  {props.site.camping && <span className="tag">Camping</span>}
                </p>
                
                {Auth.loggedIn() && (
                  <>
                  <p>Your Rating:</p>
                  <StarRating site={props} />
                  {average ? (<p>Average Rating: {average}</p>)
                  : <div>git </div>} 
                
                  
                  </>
                )}
                {!Auth.loggedIn() && (<></>)}
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