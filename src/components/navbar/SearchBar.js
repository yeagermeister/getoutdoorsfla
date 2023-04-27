import React, { useEffect, useState } from 'react';

function SearchBar() { 
    return (
        <>
        <div className="container-fluid navbar pb-2">
        <h1 className="pb-1">Find your fountain of youth!</h1>
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
          <label className="form-check-label" htmlFor="inlineCheckbox3">Scuba Diving</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pricingFee" value="option3" />
          <label className="form-check-label" htmlFor="inlineCheckbox3">Free Admission</label>
        </div>
      </div>
      <button className="btn-info ponce w-100" id="searchBtn" type="submit">Ponce!</button>
      </>
    );
};

export default SearchBar;