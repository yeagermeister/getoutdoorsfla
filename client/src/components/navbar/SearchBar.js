import React, { useEffect, useState } from 'react';

function SearchBar() { 
    return (
        <>
        <div className="container-fluid searchbar pb-2">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="statePark" value="option1" />
          <label className="form-check-label" htmlFor="inlineCheckbox1">State Park</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="petFriendly" value="option2" />
          <label className="form-check-label" htmlFor="inlineCheckbox2">Pet Friendly</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="campingAllowed" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Camping Onsite</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="scubaDiving" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">City Park</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pricingFee" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Beach</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pricingFee" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Swimming Hole</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pricingFee" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Spring</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pricingFee" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Free Admission</label>
        </div>
        <p className='text-center'>Please select options above to filter sites.</p>
      </div>
      </>
    );
};

export default SearchBar;