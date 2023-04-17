import React from 'react';
import { useQuery, gql } from '@apollo/client';

const NewSite = () => {
    const NEWSITE_QUERY= gql`
    query getNewSite {
        newSite {
            _id
            siteName
            description
            zipcode
            camping
            pets
            statepark
            park
            beach
            swimmingHole
            spring
            free
          }
    }
    `;

    const { data, loading, error } = useQuery(NEWSITE_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    console.log(data)
    return (
        <>
        <div>
            <h2>New Sites</h2>
            <ul>
                {data.newSite.map((site) => (
                    <li key={site._id}>{site._id}, {site.siteName}, <button id={site._id}>Review Submission</button></li>
                ))};
            </ul>
        </div>
        </>
    );
;}

export default NewSite;