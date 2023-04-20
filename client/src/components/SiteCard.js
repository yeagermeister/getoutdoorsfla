import React from 'react';

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
                  src={site.imageUrl}
                  className='card-img-top border rounded img-border w-75'
                  alt='a natural spring'
                />
              </div>
              <div className='card-body'>
                <p className='card-description'>{site.description}</p>
              </div>
              <p className='text-center'>
                <span id={site.id} className='mr-5'>
                  67 miles away
                </span>
                <a
                  href={`/site/${site.id}`}
                  className='btn btn-info btn-sm active myButton'
                  role='button'
                  aria-pressed='true'
                >
                  More Information
                </a>
                <span id={`weather"${site.id}`} className='ml-5'></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default SiteCard;