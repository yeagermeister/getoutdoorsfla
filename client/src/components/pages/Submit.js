import React, { useState } from "react";
import '../../form.css';
import { useMutation } from '@apollo/client';
import { ADD_SITE } from '../../utils/mutations';

function Submit() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string
    const [formState, setFormState] = useState({
        sitename: '',
        description: '',
        camping: '',
        pets: '',
        statepark: '',
        park: '',
        beach: '',
        swimmingHole: '',
        spring: '',
        zipcode: '',
        free: '',
        errorMessage: ''
    });

    const [addSite, {error, data }] = useMutation(ADD_SITE);



    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
       const {name, value } = e.target;

       setFormState({
        ...formState,
        [name]: value,
       });
       
        // const { target } = e;
        // const inputType = target.name;
        // const inputValue = target.value;
    
    
        // if (inputType === 'formstate.sitename') {
        //     setSiteName(inputValue);
        // }
        // if (inputType === 'description') {
        //     setDescription(inputValue);
        // } 
        // if (inputType === 'camping'){
        //     setCamping(inputValue);
        // }
        // if (inputType === 'pets'){
        //     setPets(inputValue);
        // }
        // if (inputType === 'statepark'){
        //     setStatepark(inputValue);
        // }
        // if (inputType === 'park'){
        //     setPark(inputValue);
        // }
        // if (inputType === 'beach'){
        //     setBeach(inputValue);
        // }
        // if (inputType === 'swimmingHole'){
        //     setSwimmngHole(inputValue);
        // }
        // if (inputType === 'spring'){
        //     setSpring(inputValue);
        // }
        // if (inputType === 'free'){
        //     setSpring(inputValue);
        // }
        // if (inputType === 'zipcode'){
        //     setZipcode(inputValue);
        // }
      };

      const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
    
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if (!formState.zipcode || !formState.sitename || !formState.description) {
        //   setErrorMessage('Site submission requires a name, description, and the zipcode');
          // We want to exit out of this code block if something is wrong so that the user can correct it
          return;
        }

        try { 
            const { data } = addSite({
                variables: {...formState}
            })
        } catch(e) {
            console.error(e);
        }

        // If everything goes according to plan, we want to clear out the input after a successful registration.
        // setSiteName('');
        // setDescription('');
        // setCamping('');
        // setPets('');
        // setStatepark('');
        // setPark('');
        // setBeach('');
        // setSwimmngHole('');
        // setSpring('');
        // setZipcode('');
        // setFree('');
      };

    return (
        <div className='container'>
          {/* <p>Hello {userName}</p> */}
          <form className="form">
            <p className="text-center">Please enter the information below to add a new location to the site.</p>
            <div className="row">
                <div className="col-sm">
                    <ul className='list-unstyled'>
                        <li><label>Location Name:</label></li>

                        <li><input value={formState.sitename} name="sitename" onChange={handleInputChange} type="text" /></li>
                        <li><label>Description:</label></li>
                        <li><textarea value={formState.description} name="description" onChange={handleInputChange}  rows={4} cols={40}/></li>
                        <li><label>Zicode:</label></li>
                        <li><input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="integer" /></li>
                    </ul>
                </div>
                <div className="col-sm">
                    <ul className='list-unstyled'>
                    <li><p>Please check all that apply</p></li>
                    <li><label>Camping Allowed?</label></li>
                    <li><input value={formState.camping} name="camping" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Pets Allowed?</label></li>
                    <li><input value={formState.pets} name="pets" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Statepark?</label></li>
                    <li><input value={formState.statepark} name="statepark" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>City/County Park</label></li>
                    <li><input value={formState.park} name="park" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Beach</label></li>
                    <li><input value={formState.beach} name="beach" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Swimming Hole</label></li>
                    <li><input value={formState.swimmingHole} name="swimmingHole" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Spring</label></li>
                    <li><input value={formState.spring} name="spring" onChange={handleInputChange} type="checkbox" /></li>
                    <li><label>Free Admission?</label></li>
                    <li><input value={formState.free} name="free" onChange={handleInputChange} type="checkbox" /></li>
                    </ul>
                </div>
            </div>
            <button type="button" onClick={handleFormSubmit}>Submit</button>
          </form>
          {error && (
            <div>
              <p className="error-text">{error.message}</p>
            </div>
          )}
        </div>
      );
};

export default Submit;
