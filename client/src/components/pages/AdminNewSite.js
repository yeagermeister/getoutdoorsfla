import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FIND_ONE_NEWSITE } from '../../utils/queries';
import { DELETE_NEW_SITE, SEND_TO_PROD } from '../../utils/mutations';

const MyFormComponent = () => {
  const [siteID, setSiteID] = useState('');
  const [siteName, setSiteName] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [lat, setLat] = useState('');
//   const [lon, setLon] = useState('');
//   const [zipcode, setZipcode] = useState('');
//   const [camping, setCamping] = useState(false);
//   const [pets, setPets] = useState(false);
//   const [statepark, setStatePark] = useState(false);
//   const [park, setPark] = useState(false);
//   const [beach, setBeach] = useState(false);
//   const [swimmingHole, setSwimmingHole] = useState(false);
//   const [spring, setSpring] = useState(false);
//   const [free, setFree] = useState(false);

  const { data, loading, error } = useQuery(FIND_ONE_NEWSITE, {
    // Use appropriate options for your query, e.g. variables, fetchPolicy, etc.
  });

  const [deleteNewSite] = useMutation(DELETE_NEW_SITE, {
    // Use appropriate options for your mutation, e.g. variables, refetchQueries, etc.
  });

  const [sendToProd] = useMutation(SEND_TO_PROD, {
    // Use appropriate options for your mutation, e.g. variables, refetchQueries, etc.
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic, e.g. invoking mutations
    sendToProd();
  };

  const handleDelete = () => {
    // Perform delete logic, e.g. invoking mutations
    deleteNewSite();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>My Form Component</h1>
      <form onSubmit={handleSubmit}>
        {/* Render form fields here */}
        <input
          type="text"
          value={siteID}
          onChange={(e) => setSiteID(e.target.value)}
        />
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        {/* Other fields */}
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MyFormComponent;
