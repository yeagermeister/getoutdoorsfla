import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeather, iconUrl } from '../utils/weather';
import { latitude, longitude } from '../utils/location';

const SiteCard = ({ sites }) => {
  const [enrichedSites, setEnrichedSites] = useState([]);
  const [distances, setDistances] = useState([]);

  const icon = "https://" + iconUrl;

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

      const distance = c * R; // in metres
      return distance / 1609.344; // convert to miles
    };

    const fetchData = async () => {
      try {
        const enrichedData = await Promise.all(sites.map(async (site) => {
          const weather = await getWeather(site.zipcode);
          return { ...site, ...weather };
        }));
        setEnrichedSites(enrichedData);

        const distanceData = sites.map((site) => {
          const distance = getDistance(site.lat, site.lon, latitude, longitude);
          return { id: site.id, distance };
        });
        setDistances(distanceData);
      } catch (error) {
        console.error('Error enriching data:', error)
      }
    };

    fetchData();
  }, [sites]);


  return (
    <div className='container'>
      <div className='row w-60 m-5 p-5'>
        {enrichedSites.map((site, index) => (
          <div key={site.id} className='col-sm'>
            <div className='card border box border-rounded shadow myCard'>
              <h5 className='card-title text-center'>{site.siteName}</h5>
              <div className='text-center'>
                <img
                  src={site.imageURL}
                  className='card-img-top border rounded img-border w-75'
                  alt={site.altText}
                />
              </div>
              <div className='card-body'>
                <p className='card-description'>{site.description}</p>
              </div>
              <p className='text-center'>
              <span id={`distance${site.id}`} className='mr-5'>
              {distances[index] ? distances[index].distance.toFixed(0) : ''} miles away
                </span>
                <Link to={`/Site/${site._id}`}><button className='btn btn-info btn-sm active myButton'>More Information</button></Link>
                <span id={`weather${site._id}`} className='ml-5'><img src={icon} alt='weather icon' /></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteCard;