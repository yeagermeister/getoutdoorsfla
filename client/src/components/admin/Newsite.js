import React, { useEffect, useRef, useState } from 'react';
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

const [addProdSite, proddata] = useMutation(SEND_TO_PROD);

const [IdState, SetIdState] = useState({

})

const [formState, setFormState] = useState({
    siteName: siteName,
    description: description,
    zipcode: zipcode,
    id: '',
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

  const zipRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const idRef = useRef(null);

  useEffect(() => {
    if (zipRef.current) {
        formState.zipcode = zipRef.current.value
    }
    if (nameRef.current) {
        const nameValue = nameRef.current.value;
       
      }
      if (descRef.current) {
        const descValue = descRef.current.value;
        
      }
      if (idRef.current) {
        formState.id = idRef.current.value;
      }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const zipcode = parseInt(zipRef.current.value);
    const lat = parseFloat(formState.latitude);
    const lon = parseFloat(formState.longitude);
    let myData = {
      siteName: nameRef.current.value,
      description: descRef.current.value,
      altText: formState.altText,
      zipcode: zipcode,
      id: formState.id,
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
    console.log(myData);
    console.log(formState);
    
    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!myData.zipcode || !myData.siteName || !myData.description) {
    //   setErrorMessage('Site submission requires a name, description, and the zipcode');
      // We want to exit out of this code block if something is wrong so that the user can correct it
      
      return;
    }
    else{
    try { 
        console.log(myData)
        const {proddata} = await addProdSite({
            variables: {...myData}
        }) 
        const response = await deleteNewSite({ variables: { deleteSiteId: id }, refetchQueries: [{ query: NEWSITE_QUERY }] });
        console.log(response)
        // Assuming response.data contains the updated data after deletion
        const deletedSiteId = response.data.deleteSite._id;
        setData((prevSites) => prevSites.filter((site) => site._id !== deletedSiteId));
        setComponentKey((prevKey) => prevKey + 1);
    } catch(e) {
        console.error(e);
    }}

  };
const [deleteNewSite] = useMutation(DELETE_NEW_SITE);
const [componentKey, setComponentKey] = useState(0);

// const handleDelete = (userId) => {
//     deleteUser({
//         variables: { deleteUserId: userId }
//     });
//     setUserData((prevUsers) => prevUsers.filter((user) => user._id !== userId));
// };

const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
            const response = await deleteNewSite({ variables: { deleteSiteId: id }, refetchQueries: [{ query: NEWSITE_QUERY }] });
            console.log(response)
            // Assuming response.data contains the updated data after deletion
            const deletedSiteId = response.data.deleteSite._id;
            setData((prevSites) => prevSites.filter((site) => site._id !== deletedSiteId));
            setComponentKey((prevKey) => prevKey + 1);
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
                    <div className='container-fluid'>
                        {console.log(site)}
                    
                    <div className="row">
                        <div className="col-sm">
                            <form className="w-100" onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="form-group col-sm-3 col-md-6">          
                                        <label>Location Name:</label>
                                        <input value={site.siteName} name="siteName" ref={nameRef} onChange={handleInputChange} type="text" />
                                        <label>Description:</label>
                                        <textarea value={site.description} ref={descRef}  name="description" onChange={handleInputChange}  rows={4} cols={40}/>
                                        <label>Zipcode:</label>
                                        <input value={site.zipcode} ref={zipRef} name="zipcode" onChange={handleInputChange} type="number" />
                                        <label>imageURL:</label>
                                        <input value={site.imageURL} name="imageURL" onChange={handleInputChange} type="text" />
                                        <label>altText:</label>
                                        <input value={site.altText} name="altText" onChange={handleInputChange} type="text" />
                                        <label>Latitude:</label>
                                        <input value={site.latitude} name="latitude" onChange={handleInputChange} type="number" step="0.000000001"/>
                                        <label>Longitude:</label>
                                        <input value={site.longitude} name="longitude" onChange={handleInputChange} type="number" step="0.000000001"/>
                                        <label>site-id</label>
                                        <input value={site._id} ref={idRef} type="text" name="siteId" onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group col-sm-3 col-md-6">
                                        <p className="text-center">Please check all that apply</p>
                                        <div className="input-group">
                                        <span className="input-group-addon">
                                                    <input value={checked.camping} name="camping" onChange={handleCheckboxChange} type="checkbox" />
                                                    </span>
                                                {site.camping ? (
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
                                            {site.pets ? (
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
                                            {site.statepark ? (
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
                                            {site.park ? (
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
                                            {site.beach ? (
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
                                            {site.swimmingHole ? (
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
                                            {site.spring ? (
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
                                            {site.free ? (
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
                            <button type="delete" onClick={(event) => handleDelete(event, site._id)}>Delete</button>
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