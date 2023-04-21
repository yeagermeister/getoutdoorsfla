import React, { useState, useContext, useEffect } from "react";
import { SiteContext } from '../context/SiteContext'
import { useParams } from 'react-router-dom';
import '../form.css';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SITE, ADD_PROD_SITE, DELETE_NEW_SITE} from '../utils/mutations';
// import queryString from 'query-string';
// import { FIND_ONE_NEWSITE } from '../../utils/queries'



const AdminNewSite = (props) => {
    const {id} = useParams();
    const { siteData } = useContext(SiteContext); // Access the global state

    const inCamping = siteData.camping.toString();
    const inPets = siteData.pets.toString();
    const inStatepark = siteData.statepark.toString();
    const inPark = siteData.park.toString();
    const inBeach = siteData.beach.toString();
    const inSwimmingHole = siteData.swimmingHole.toString();
    const inSpring = siteData.spring.toString();
    const inFree = siteData.free.toString();


    console.log(siteData._id)
    const [formState, setFormState] = useState({
        siteName: siteData.siteName,
        description: siteData.description,
        zipcode: siteData.zipcode,
        imageUrl: '',
        latitude: '',
        longitude: '',
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

      useEffect(() => {
        // Update checked state based on siteData
        setChecked({
            camping: siteData.camping,
            pets: siteData.pets,
            statepark: siteData.statepark,
            park: siteData.park,
            beach: siteData.beach,
            swimmingHole: siteData.swimmingHole,
            spring: siteData.spring,
            free: siteData.free,
        });
    }, [siteData]);

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

      const [deleteUser] = useMutation(DELETE_NEW_SITE, {
        update(cache, { data: { deleteUser } }) {
            // const { users } = cache.readQuery({ query: USERS_QUERY });
            // cache.writeQuery({
            //     // query: USERS_QUERY,
            //     data: { users: users.filter(user => user._id !== deleteUser._id) }
            // });
        }
    });

    const handleDelete = (site) => {
        deleteUser({
            variables: { site }
        });
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
                                <input value={formState.zipcode} name="imageUrl" onChange={handleInputChange} type="number" />
                                <label>Latitude:</label>
                                <input value={formState.zipcode} name="latitude" onChange={handleInputChange} type="number" />
                                <label>Longitude:</label>
                                <input value={formState.zipcode} name="longitude" onChange={handleInputChange} type="number" />
                                <button type="delete" onClick={() => handleDelete(siteData._id)}>Delete</button>
                            </div>
                            <div className="form-group col-sm-3 col-md-6">
                                <p className="text-center">Please check all that apply</p>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.camping} name="camping" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Camping Allowed? ===== {inCamping}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.pets} name="pets" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Pets Allowed? ===== {inPets} </p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.statepark} name="statepark" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Statepark ===== {inStatepark}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.park} name="park" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">City/County Park ===== {inPark}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.beach} name="beach" onChange={handleCheckboxChange} type="checkbox" />                                    </span>
                                    <p className="left-margin">Beach ===== {inBeach}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.swimmingHole} name="swimmingHole" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Swimming Hole ===== {inSwimmingHole}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <input value={checked.spring} name="spring" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Spring ===== {inSpring}</p>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                    <input value={checked.free} name="free" onChange={handleCheckboxChange} type="checkbox" />
                                    </span>
                                    <p className="left-margin">Free Admission? ===== {inFree}</p>
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
