import React from 'react';
import { useQuery, gql } from '@apollo/client';

const NewSite = () => {
    const NEWSITE_QUERY= gql`
    query getNewSite {
        newsites {
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
    return (
        <>
        <div>
            <h2>New Sites</h2>
            <ul>
                {data.newsites.map((newsite) => (
                    <li key={newsite._id}>{newsite._id}, {newsite.siteName}, <button id={newsite._id}>Review Submission</button></li>
                ))};
            </ul>
        </div>
        </>
    );
;}

export default NewSite;