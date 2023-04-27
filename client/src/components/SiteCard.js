import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeather, iconUrl } from '../utils/weather';
import { latitude, longitude } from '../utils/location';
import Auth from '../utils/auth'

const SiteCard = ({ sites }) => {
  
  const icon = "https://" + iconUrl;
  let [enrichedSites, setEnrichedSites] = useState([]);
  enrichedSites.sort((a, b) => a.distance - b.distance);

  let [displaySites, setDisplaySites] = useState([]);

  // let filterOn = false;

  const [checked, setChecked] = useState({
    camping: false,
    pets: false,
    statepark: false,
    park: false,
    beach: false,
    swimmingHole: false,
    spring: false,
    free: false,
    filterOn: false
    });

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
   const {name, checked: isChecked } = e.target;
   setChecked(prevState => {
    return {
      ...prevState, // Copying the previous state
      [name]: isChecked,
      filterOn: true // Updating the specific property with the new value
    }
  });
  };


  useEffect(() => {
    // filterOn = true; 
    // console.log("effect", filterOn)

    let filteredSites = [...enrichedSites]; // Create a copy of 'enrichedSites'
    
    filteredSites.sort((a, b) => a.distance - b.distance);
    // Filter 'filteredSites' based on 'checked' state values
    if (checked.camping) {
      filteredSites = filteredSites.filter(site => site.camping);
    } 
    if (checked.pets) {
      filteredSites = filteredSites.filter(site => site.pets);
    }
    if (checked.statepark) {
      filteredSites = filteredSites.filter(site => site.statepark);
    }
    if (checked.park) {
      filteredSites = filteredSites.filter(site => site.park);
    }
    if (checked.beach) {
      filteredSites = filteredSites.filter(site => site.beach);
    }
    if (checked.swimmingHole) {
      filteredSites = filteredSites.filter(site => site.swimmingHole);
    }
    if (checked.spring) {
      filteredSites = filteredSites.filter(site => site.spring);
    }
    if (checked.free) {
      filteredSites = filteredSites.filter(site => site.free);
    }

    setDisplaySites(filteredSites); // Update 'enrichedSites' with filtered array
  }, [checked]);

  

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
        const [weatherData, locationData] = await Promise.all([
          Promise.all(sites.map(async (site) => {
            const weather = await getWeather(site.zipcode);
            return { ...site, weather };
          })),
          Promise.all(sites.map(async (site) => {
            const distance = getDistance(site.lat, site.lon, latitude, longitude);
            return { ...site, distance };
          }))
        ]);
        const enrichedData = weatherData.map((site, index) => ({
          ...site,
          ...locationData[index]
        }));
        setEnrichedSites(enrichedData);
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
              <div className="form-group top-spacing">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="statepark" value="option1" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">State Park</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="pets" value="option2" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">Pet Friendly</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="camping" value="option3" onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Camping Onsite</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="spring" value="option3"onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Spring</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="beach" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Beach</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="swimmingHole" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Swimming Hole</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="park" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">City Park</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" name="free" value="option3" onChange={handleInputChange}/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">Free Admission</label>
                </div>
              </div>
        </div>
      <p className='text-center'>Please select options above to filter sites.</p>
    </div>
    ) : (
      <div></div>
    )}
    { checked.filterOn ? (
    <div className='submitterinoouter p-1 my-5 container'>
    <div className='row flex submitterinoinner flex-wrap m-5 p-5'>
        {displaySites.map((site, index) => (
          <div key={site._id} className='col-lg-6 col-md-12'>
            <div className='card border col-md- col-sm- box border-rounded shadow myCard'>
              <h5 className='card-title text-center'>{site.siteName}</h5>
              <div className='text-center image-container'>
                <img
                  src={site.imageURL}
                  className='card-img-top border rounded img-border w-75 h-50 image-cover'
                  alt={site.altText}
                />
              </div>
              <div className='card-body '>
                <p className='card-description'>{site.description}</p>
              </div>
         
              <p id={`distance${site.id}`} className='text-center'>
              {site.distance} miles away
                </p>
                <Link to={`/Site/${site._id}`}><button className='btn text-white btn-info btn-sm active myButton'>More Information</button></Link>
                <p>
                <span id={`weather${site._id}`} className=''><img src={`https://${site.weather}`} alt='weather icon' /></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    ) : (
      <div className='submitterinoouter p-1 my-5 container'>
      <div className='row flex submitterinoinner flex-wrap m-5 p-5'>
      {enrichedSites.map((site, index) => (
        <div key={site._id} className='col-lg-6 col-md-12'>
          <div className='card border col-md- col-sm- box border-rounded shadow myCard '>
            <h5 className='card-title text-center'>{site.siteName}</h5>
            <div className='text-center image-container'>
              <img
                src={site.imageURL}
                className='card-img-top border rounded img-border w-75 image-cover'
                alt={site.altText}
              />
            </div>
            <div className='card-body'>
              <p className='card-description'>{site.description}</p>
            </div>
            <p id={`distance${site.id}`} className='text-center'>
            {site.distance} miles away
            {console.log(site)}
              </p>
              <Link to={`/Site/${site._id}`}><button className='btn text-white btn-info btn-sm active myButton'>More Information</button></Link>
              <p>
              <span id={`weather${site._id}`} className=''><img src={`https://${site.weather}`} alt='weather icon' /></span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
    )
}
    </>
  );
};

export default SiteCard;