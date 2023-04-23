import React from 'react';
import { Link } from 'react-router-dom';

const SiteCard = ({ sites }) => {
  return (
    <div className='container'>
      <div className='row w-60 m-5 p-5'>
        {sites.map(site => (
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
                <span id={`weather${site._id}`} className='ml-5'></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default SiteCard;