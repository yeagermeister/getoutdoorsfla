import React from "react";
import { FIND_ALL_SITES } from '../../utils/queries';
import { useQuery } from '@apollo/client'

const Sites = () => {

  
  const { data, loading, error } = useQuery(FIND_ALL_SITES);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  return (
    <>
      <div>
        <ul>
          {data.findAllSites.map((site) => (
            <li key={site._id}>
              {site._id}, {site.siteName},{site.siteName}
              <button id={site._id}>Edit Site</button>
            </li>
          ))}
          
        </ul>
      </div>
    </>
  );
};

export default Sites;
