import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import '../form.css';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SITE, ADD_PROD_SITE} from '../utils/mutations';
// import queryString from 'query-string';
// import { FIND_ONE_NEWSITE } from '../../utils/queries'



const AdminNewSite = (props) => {
    const {id} = useParams();
    // console.log(id, siteName);

    // Get the data from the site ID that was passed in
    // const [newSitedata, newSiteloading, newSiteerrors] = useQuery(FIND_ONE_NEWSITE);


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
        e.preventDefault();
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
            console.log(data)
        } catch(e) {
          console.log(data)
            console.error(e);
        }}

      };

    return (
        
        <div className='container-fluid'>
            <h3>{id}</h3>
            <div className="row">
                <div className="col-sm">
                    <form className="w-100">
                        <div className="row">
                            <div className="form-group col-sm-3 col-md-6">          
                                <label>Location Name:</label>
                                <input value={formState.siteName} name="siteName" onChange={handleInputChange} type="text" />
                                <label>Description:</label>
                                <textarea value={formState.description} name="description" onChange={handleInputChange}  rows={4} cols={40}/>
                                <label>Zipcode:</label>
                                <input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="number" />
                                <label>imageURL:</label>
                                <input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="number" />
                                <label>Latitude:</label>
                                <input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="number" />
                                <label>Longitude:</label>
                                <input value={formState.zipcode} name="zipcode" onChange={handleInputChange} type="number" />
                                <button type="delete">Delete</button>
                            </div>
                            <div className="form-group col-sm-3 col-md-6">
                                <p className="text-center">Please check all that apply</p>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.camping} name="camping" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Camping Allowed?</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.pets} name="pets" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Pets Allowed?</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.statepark} name="statepark" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Statepark</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.park} name="park" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">City/County Park</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.beach} name="beach" onChange={handleCheckboxChange} type="checkbox" />                                    </span>
                                    <p className="left-margin">Beach</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.swimmingHole} name="swimmingHole" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Swimming Hole</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.spring} name="spring" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Spring</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                    <input value={checked.free} name="free" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Free Admission?</p>
                                </div>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        {error && (
          <div>
            <p className="error-text">{error.message}</p>
          </div>
        )}
      </div>
    )
}

export default AdminNewSite;
