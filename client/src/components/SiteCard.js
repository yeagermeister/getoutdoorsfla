import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeather, iconUrl } from '../utils/weather';
import { latitude, longitude } from '../utils/location';
import Auth from '../utils/auth'

const SiteCard = ({ sites }) => {
  const [enrichedSites, setEnrichedSites] = useState([]);
  const [distances, setDistances] = useState([]);

  console.log(enrichedSites);
  enrichedSites.sort((a, b) => a.distance - b.distance);

  const icon = "https://" + iconUrl;
  const [checked, setChecked] = useState({

    camping: false,
    pets: false,
    statepark: false,
    park: false,
    beach: false,
    swimmingHole: false,
    spring: false,
    free: false,
    });
  
  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
   const {name, value } = e.target;
  
   setChecked({
   });
  };

  useEffect(() => {
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI/180; // φ, λ in radians
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      const metres = c * R; // in metres
      const miles = metres / 1609.344;
      const distance = Math.round(miles)
      return distance // convert to miles
    };

    const fetchData = async () => {
      try {
        const enrichedData = await Promise.all(sites.map(async (site) => {
          const weather = await getWeather(site.zipcode);
          return { ...site, weather };
        }));
        setEnrichedSites(enrichedData);

        const distanceData = sites.map((site) => {
          const distance = getDistance(site.lat, site.lon, latitude, longitude);
          return { ...site, distance };
        });
        setEnrichedSites(distanceData);
      } catch (error) {
        console.error('Error enriching data:', error)
      }
    };

    fetchData();
  }, [sites]);


  return (
    <>
    { Auth.loggedIn () ? (
      <div className="container-fluid searchbar pb-2">
        <div className='row'>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="statePark" value="option1" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">State Park</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="petFriendly" value="option2" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">Pet Friendly</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="campingAllowed" value="option3" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Camping Onsite</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="spring" value="option3"onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Spring</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="beach" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Beach</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="swimmingHole" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Swimming Hole</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="park" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">City Park</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="free" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Free Admission</label>
                </div>
              </div>
        </div>
      <p className='text-center'>Please select options above to filter sites.</p>
    </div>
    ) : (
      <div></div>
    )}

    <div className='submitterinoouter p-1 my-5 container'>
      <div className='row flex submitterinoinner flex-wrap m-5 p-5'>
        {enrichedSites.map((site, index) => (
          <div key={site.id} className=' col-lg-6 col-md-12'>
            <div className='card border col-md- col-sm- box border-rounded shadow myCard'>
              <h5 className='card-title  text-center'>{site.siteName}</h5>
              <div className='text-center '>
                <img
                  src={site.imageURL}
                  className='card-img-top border rounded img-border w-75'
                  alt={site.altText}
                />
              </div>
              <div className='card-body '>
                <p className='card-description'>{site.description}</p>
              </div>
              <p className='text-center'>
              <span id={`distance${site.id}`} className='mr-5'>
              {site.distance} miles away
                </span>
                <Link to={`/Site/${site._id}`}><button className='btn btn-info btn-sm active myButton'>More Information</button></Link>
                <span id={`weather${site._id}`} className='ml-5'><img src={icon} alt='weather icon' /></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default SiteCard;