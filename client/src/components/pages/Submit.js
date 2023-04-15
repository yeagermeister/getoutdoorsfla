import React, { useState } from "react";
import '../../form.css';

function Submit() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string
    const [sitename, setSiteName] = useState('');
    const [description, setDescription] = useState('');
    const [camping, setCamping] = useState('');
    const [pets, setPets] = useState('');
    const [statepark, setStatepark] = useState('');
    const [park, setPark] = useState('');
    const [beach, setBeach] = useState('');
    const [swimmingHole, setSwimmngHole] = useState('');
    const [spring, setSpring] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [free, setFree] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
    
        if (inputType === 'sitename') {
            setSiteName(inputValue);
        }
        if (inputType === 'description') {
            setDescription(inputValue);
        } 
        if (inputType === 'camping'){
            setCamping(inputValue);
        }
        if (inputType === 'pets'){
            setPets(inputValue);
        }
        if (inputType === 'statepark'){
            setStatepark(inputValue);
        }
        if (inputType === 'park'){
            setPark(inputValue);
        }
        if (inputType === 'beach'){
            setBeach(inputValue);
        }
        if (inputType === 'swimmingHole'){
            setSwimmngHole(inputValue);
        }
        if (inputType === 'spring'){
            setSpring(inputValue);
        }
        if (inputType === 'free'){
            setSpring(inputValue);
        }
        if (inputType === 'zipcode'){
            setZipcode(inputValue);
        }
      };

      const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
    
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if (!zipcode || !springName || !description) {
          setErrorMessage('Site submission requires a name, description, and the zipcode');
          // We want to exit out of this code block if something is wrong so that the user can correct it
          return;
        }

        // If everything goes according to plan, we want to clear out the input after a successful registration.
        setSiteName('');
        setDescription('');
        setCamping('');
        setPets('');
        setStatepark('');
        setPark('');
        setBeach('');
        setSwimmngHole('');
        setSpring('');
        setZipcode('');
        setFree('');
      };

    return (
        <div className='container'>
          {/* <p>Hello {userName}</p> */}
          <form className="form">
            <p className="text-center">Please enter the information below to add a new location to the site.</p>
            <div className="row">
                <div clasName="col-sm">
                    <ul className='list-unstyled'>
                        <li><label>Location Name:</label></li>

                        <li><input value={sitename} name="sitename" onChange={handleInputChange} type="text" /></li>
                        <li><label>Description:</label></li>
                        <li><textarea value={description} name="description" onChange={handleInputChange}  rows={4} cols={40}/></li>
                        <li><label>Zicode:</label></li>
                        <li><input value={zipcode} name="zipcode" onChange={handleInputChange} type="integer" /></li>
                    </ul>
                </div>
                <div className="col-sm">
                    <ul className='list-unstyled'>
                    <li><p>Please check all that apply</p></li>
                    <li><label>Camping Allowed?</label></li>
                    <li><input value={camping} name="camping" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Pets Allowed?</label></li>
                    <li><input value={pets} name="pets" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Statepark?</label></li>
                    <li><input value={statepark} name="statepark" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>City/County Park</label></li>
                    <li><input value={park} name="park" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Beach</label></li>
                    <li><input value={beach} name="beach" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Swimming Hole</label></li>
                    <li><input value={swimmingHole} name="swimmingHole" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Spring</label></li>
                    <li><input value={spring} name="spring" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Free Admission?</label></li>
                    <li><input value={free} name="free" onChange={handleInputChange} type="checkbox" /></li>
                    </ul>
                </div>
            </div>
            <button type="button" onClick={handleFormSubmit}>Submit</button>
          </form>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
        </div>
      );
};

export default Submit;
