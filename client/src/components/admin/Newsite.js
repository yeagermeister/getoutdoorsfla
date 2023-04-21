import React, {useContext} from 'react';
import { NEWSITE_QUERY } from '../../utils/queries';
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom';
import { SiteContext } from '../../context/SiteContext'

const NewSite = () => {
    const { siteData, updateSiteData } = useContext(SiteContext);
    const handleUpdateSiteData = (site) => {
        updateSiteData(site);
      };

    const { data, loading, error } = useQuery(NEWSITE_QUERY);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
        <>
        <div>
            <ul>
                {data.findAllNewSites.map((site) => (
                    <li key={site._id}>{site._id}, {site.siteName}, 
                        <Link to={`/AdminNewSite/${site._id}`}>
                            <button id={site._id} onClick={() => handleUpdateSiteData(site)}>Review Submission</button>
                        </Link>
                    </li>
                ))};
            </ul>
        </div>
        </>
    );
;}

export default NewSite;