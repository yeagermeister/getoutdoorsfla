import React from "react";
import SiteCard from '../components/SiteCard';
import { FIND_ALL_SITES } from '../utils/queries';
import { useQuery } from '@apollo/client';

// These need deleted after the database is connected
//  Get a list of all sites


const Home = () => {

    const { data, loading, error } = useQuery(FIND_ALL_SITES);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    

    return (
        <>
            <SiteCard sites={data.findAllSites}/>
        </>
    )
}

export default Home;
