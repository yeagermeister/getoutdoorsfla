import React, { useEffect, useState } from 'react';
import { NEWSITE_QUERY } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom';
import { useParams, useNavigate} from 'react-router-dom';
import '../../form.css';
import { SEND_TO_PROD, DELETE_NEW_SITE} from '../../utils/mutations';

const NewSite = () => {

const [newSiteData, setData] = useState([]);


const {id, siteName, description, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free} = useParams();
// const { siteData } = useContext(SiteContext); // Access the global state
const navigate = useNavigate();

const [addProdSite, {proddata }] = useMutation(SEND_TO_PROD);

// const inCamping = camping.toString();
// const inPets = pets.toString();
// const inStatepark = statepark.toString();
// const inPark = park.toString();
// const inBeach = beach.toString();
// const inSwimmingHole = swimmingHole.toString();
// const inSpring = spring.toString();
// const inFree = free.toString();

const [formState, setFormState] = useState({
    siteName: siteName,
    description: description,
    zipcode: zipcode,
    imageURL: '',
    altText: '',
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

// const [addProdSite, {error, data }] = useMutation(SEND_TO_PROD);

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
    const lat = parseFloat(formState.latitude);
    const lon = parseFloat(formState.longitude);
    let myData = {
      siteName: formState.siteName,
      description: formState.description,
      altText: formState.altText,
      zipcode: zipcode,
      camping: checked.camping,
      pets: checked.pets,
      statepark: checked.statepark,
      park: checked.park,
      beach: checked.beach,
      swimmingHole: checked.swimmingHole,
      spring: checked.spring,
      free: checked.free,
      imageURL: formState.imageURL,
      lat: lat,
      lon: lon
    };
    
    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!formState.zipcode || !formState.siteName || !formState.description) {
    //   setErrorMessage('Site submission requires a name, description, and the zipcode');
      // We want to exit out of this code block if something is wrong so that the user can correct it
      
      return;
    }
    else{
    try { 
        
        const {data} = await addProdSite({
            variables: {...myData}
        }) 
    } catch(e) {
        console.error(e);
    }}

  };
const [deleteNewSite] = useMutation(DELETE_NEW_SITE);

const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
        const response = await deleteNewSite({ variables: {deleteSiteId: id } });
        console.log('Deleted something:', response);
        navigate('/admin'); // Redirect to /admin
     } catch (err) {
    // Handle error
    console.error('Error deleting something:', err);
  }
};  

    // Querry to get all sites in the new site collection that need moderation.  The button links to the component and from to view a single new site and push it to prod.
    const { data, loading, error } = useQuery(NEWSITE_QUERY, {
        onCompleted: (data) => {
            setData(data.findAllNewSites)
        }
    });
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
        <div>
            <ul>
                {data.findAllNewSites.map((site) => (
                    // <li key={site._id}>{site._id}, {site.siteName}, 
                    //     <Link to={`/AdminNewSite/${site._id}/${site.siteName}/${site.description}/${site.zipcode}/${site.camping}/${site.pets}/${site.statepark}/${site.park}/${site.beach}/${site.swimmingHole}/${site.spring}/${site.free}/`}>
                    //         <button id={site._id}>Review Submission</button>
                    //     </Link>
                    // </li>
                    <div className='container-fluid'>
                       { console.log(site.beach)}
                    <h3>{id}</h3>
                    <div className="row">
                        <div className="col-sm">
                            <form className="w-100" onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="form-group col-sm-3 col-md-6">          
                                        <label>Location Name:</label>
                                        <input value={site.siteName} name="siteName" onChange={handleInputChange} type="text" />
                                        <label>Description:</label>
                                        <textarea value={site.description} name="description" onChange={handleInputChange}  rows={4} cols={40}/>
                                        <label>Zipcode:</label>
                                        <input value={site.zipcode} name="zipcode" onChange={handleInputChange} type="number" />
                                        <label>imageURL:</label>
                                        <input value={site.imageURL} name="imageURL" onChange={handleInputChange} type="text" />
                                        <label>altText:</label>
                                        <input value={site.altText} name="altText" onChange={handleInputChange} type="text" />
                                        <label>Latitude:</label>
                                        <input value={site.latitude} name="latitude" onChange={handleInputChange} type="number" />
                                        <label>Longitude:</label>
                                        <input value={site.longitude} name="longitude" onChange={handleInputChange} type="number" />
                                    </div>
                                    <div className="form-group col-sm-3 col-md-6">
                                        <p className="text-center">Please check all that apply</p>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                                    <input value={checked.camping} name="camping" onChange={handleCheckboxChange} type="checkbox" />
                                                    </span>
                                                {site.camping ? true (
                                                <>
                                                <p className="left-margin">Camping Allowed? ===== Allowed</p> 
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Camping Allowed? ===== Not Allowed</p> 
                                                </>
                                                )}
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.pets} name="pets" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Pets Allowed? ===== Allowed </p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Pets Allowed? ===== Not Allowed </p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.statepark} name="statepark" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Statepark ===== True</p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Statepark ===== False</p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.park} name="park" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">City/County Park ===== True</p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">City/County Park ===== False</p> 
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.beach} name="beach" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>                                  
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Beach ===== True</p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Beach ===== False</p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.swimmingHole} name="swimmingHole" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Swimming Hole ===== True</p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Swimming Hole ===== False</p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <input value={checked.spring} name="spring" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Spring ===== True</p> 
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Spring ===== False</p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                            <input value={checked.free} name="free" onChange={handleCheckboxChange} type="checkbox" />
                                            </span>
                                            {site.camping ? true (
                                                <>
                                                <p className="left-margin">Free Admission? ===== Free</p>
                                                </>
                                                ):(
                                                <>
                                                <p className="left-margin">Free Admission? ===== Not Free</p>
                                                </>
                                                )}
                                            
                                        </div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                            <button type="delete" onClick={(event) => handleDelete(event, id)}>Delete</button>
                        </div>
                    </div>
                {error && (
                  <div>
                    <p className="error-text">{error.message}</p>
                  </div>
                )}
              </div>


                ))}
            </ul>
        </div>

        </>
    );
;}

export default NewSite;