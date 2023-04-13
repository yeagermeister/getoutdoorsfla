import React from 'react';

const SiteCard = (props) => {
    return (
    <div className='container'>
  <div className="row w-60 m-5 p-5">
    {props.sites.map(item => (
    <div key={item.id}className="col-sm">
      <div className="card border box border-rounded shadow myCard">
        <h5 className="card-title text-center">{item.name}</h5>
        <div className="text-center">
          <img src={item.imageUrl} className="card-img-top border rounded img-border w-75"
            alt="a natural spring" />
        </div>
        <div className="card-body">
          <p className="card-description">{item.description}</p>
        </div>
        <p className="text-center">
          <span id={item.id} className="mr-5">67 miles away</span>
          <a href={`/site/${item.id}`} className="btn btn-info btn-sm active myButton" role="button" aria-pressed="true">More
            Information</a>
          <span id={`weather"${item.id}`} className="ml-5"></span>
        </p>
      </div>
    </div>
    ))}
  </div>
  </div>
    )
};

export default SiteCard;