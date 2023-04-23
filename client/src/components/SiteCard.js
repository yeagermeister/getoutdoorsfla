import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getWeather, iconUrl } from '../utils/weather';

const SiteCard = ({ sites }) => {
  const [enrichedSites, setEnrichedSites] = useState([]);

  const icon = "https://" + iconUrl;

  useEffect(() => {
    const getData = async () => {
      try {
        const enrichedData = await Promise.all(sites.map(async (site) => {
          const response= await getWeather(site.zipcode);
          const enrichedSite = response;
          console.log(response)
          return {...site, ...enrichedSite};
        }));
        setEnrichedSites(enrichedData);
      } catch (error) {
        console.error('Error enriching data:', error)
    }
  };
  
  getData();
}, [sites]);

  return (
    <div className='container'>
      <div className='row w-60 m-5 p-5'>
        {enrichedSites.map(site => (
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
                  67 miles away
                </span>
                <Link to={`/Site/${site._id}`}><button className='btn btn-info btn-sm active myButton'>More Information</button></Link>
                {/* {getWeather(site.zipcode)} */}
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