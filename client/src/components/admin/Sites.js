import React from "react";
import { useQuery, gql } from "@apollo/client";

const Sites = () => {
  const SITE_QUERY = gql`
    query getSite {
      sites {
        _id
        siteName
        description
        imageUrl
        distance
        weather
        zipcode
        camping
        pets
        statepark
        park
        beach
        swimmingHole
        spring
        free
        lat
        long
      }
    }
  `;

  const { data, loading, error } = useQuery(SITE_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
const toggleSite = 0
  return (
    <>
      <div>
        <h2>Sites</h2>
        <ul>
          {data.sites.map((site) => (
            <li key={site._id}>
              {site._id}, {site.siteName},{" "}
              <button id={site._id} onClick={toggleSite}>Edit Site</button>
            </li>
          ))}
          ;
        </ul>
      </div>
    </>
  );
};

export default Sites;
