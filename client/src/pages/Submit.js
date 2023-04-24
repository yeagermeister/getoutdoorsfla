import React, { useState } from "react";
import '../form.css';
import { useMutation } from '@apollo/client';
import { ADD_SITE } from '../utils/mutations';
function Submit() {
    // Create state variables for the fields in the form
    // We are also setting their initial values to an empty string
    // checkboxes have to be handled seperately than text boxes
    const [formState, setFormState] = useState({
        siteName: '',
        description: '',
        zipcode: '',
        errorMessage: ''
    });
      
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

    const [addSite, {error, data }] = useMutation(ADD_SITE);



    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
       const {name, value } = e.target;

       setFormState({
        ...formState,
        [name]: value,
       });
      };

      const handleCheckboxChange = (event) => {
        setChecked({
          ...checked,
          [event.target.name]: event.target.checked
        });
      };


      const handleFormSubmit = async (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        // e.preventDefault();
        const zipcode = parseInt(formState.zipcode);
        let myData = {
          siteName: formState.siteName,
          description: formState.description,
          zipcode: zipcode,
          camping: checked.camping,
          pets: checked.pets,
          statepark: checked.statepark,
          park: checked.park,
          beach: checked.beach,
          swimmingHole: checked.swimmingHole,
          spring: checked.spring,
          free: checked.free,
          // const zipcodeNumber = +formState.zipcode;
        };
        

        
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if (!formState.zipcode || !formState.siteName || !formState.description) {
        //   setErrorMessage('Site submission requires a name, description, and the zipcode');
          // We want to exit out of this code block if something is wrong so that the user can correct it
          
          return;
        }
        else{
        try { 
         
            const {data} = await addSite({
                variables: {...myData},
            }) 
        } catch(e) {
            console.error(e);
        }}

      };

    return (
        <div className='container'>
          <form className="form" onSubmit={handleFormSubmit}>
            <p className="text-center">Please enter the information below to add a new location to the site.</p>
            <div className="row">
                <div className="col-sm">
                    <ul className='list-unstyled'>
                        <li><label>Location Name:</label></li>

                        <li><input value={formState.siteName} name="siteName" onChange={handleInputChange} type="text" /></li>
                        <li><label>Description:</label></li>
                        <li><textarea value={formState.description} name="description" onChange={handleInputChange}  rows={4} cols={40}/></li>
                        <li><label>Zipcode:</label></li>
                        <li><input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="number" /></li>
                    </ul>
                </div>
                <div className="col-sm">
                    <ul className='list-unstyled'>
                    <li><p>Please check all that apply</p></li>
                    <li><label>Camping Allowed?</label></li>
                    <li><input value={checked.camping} name="camping" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Pets Allowed?</label></li>
                    <li><input value={checked.pets} name="pets" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Statepark?</label></li>
                    <li><input value={checked.statepark} name="statepark" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>City/County Park</label></li>
                    <li><input value={checked.park} name="park" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Beach</label></li>
                    <li><input value={checked.beach} name="beach" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Swimming Hole</label></li>
                    <li><input value={checked.swimmingHole} name="swimmingHole" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Spring</label></li>
                    <li><input value={checked.spring} name="spring" onChange={handleCheckboxChange} type="checkbox" /></li>
                    <li><label>Free Admission?</label></li>
                    <li><input value={checked.free} name="free" onChange={handleCheckboxChange} type="checkbox" /></li>
                    </ul>
                </div>
            </div>
            <button type="submit">Submit</button>
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
