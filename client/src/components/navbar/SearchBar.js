import React, { useEffect, useState, useContext } from 'react';
import Auth from '../../utils/auth'




function SearchBar() { 
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

    return (
        <>
        { Auth.loggedIn () ? (
        <div className="container-fluid searchbar pb-2">
          <div className='row'>
            <p>test</p>
                <div className="form-group top-spacing">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="statePark" value="option1" onChange={handleInputChange} />
                    <label className="form-check-label" for="inlineCheckbox1">State Park</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="petFriendly" value="option2" onChange={handleInputChange} />
                    <label className="form-check-label" for="inlineCheckbox2">Pet Friendly</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="campingAllowed" value="option3" onChange={handleInputChange} />
                    <label className="form-check-label" for="inlineCheckbox3">Camping Onsite</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="spring" value="option3"onChange={handleInputChange} />
                    <label className="form-check-label" for="inlineCheckbox3">Spring</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="beach" value="option3" onChange={handleInputChange}/>
                    <label className="form-check-label" for="inlineCheckbox3">Beach</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="swimmingHole" value="option3" onChange={handleInputChange}/>
                    <label className="form-check-label" for="inlineCheckbox3">Swimming Hole</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="park" value="option3" onChange={handleInputChange}/>
                    <label className="form-check-label" for="inlineCheckbox3">City Park</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="free" value="option3" onChange={handleInputChange}/>
                    <label className="form-check-label" for="inlineCheckbox3">Free Admission</label>
                  </div>
                </div>
          </div>
        <p className='text-center'>Please select options above to filter sites.</p>
      </div>
      ) : (
        <div></div>
      )}
      </>

    );
};

export default SearchBar;