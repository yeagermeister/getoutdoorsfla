import React from 'react';
import { NEWSITE_QUERY } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom';
import { DELETE_NEW_SITE } from '../../utils/mutations';


const NewSite = () => {
    // Function to delete the site and update the Apollo cache.
    const [deleteSite] = useMutation(DELETE_NEW_SITE, {
        update(cache, { data: { deleteSite } }) {
            const { sites } = cache.readQuery({ query: NEWSITE_QUERY });
            cache.writeQuery({
                query: NEWSITE_QUERY,
                data: { sites: sites.filter(site => site._id !== deleteSite._id) }
            });
        }
    });

    // Event handler for the delete buttom
    const handleDelete = (siteId) => {
        console.log(siteId);
        deleteSite({
            variables: { siteId }
        });
    };

    // Querry to get all sites in the new site collection that need moderation.  The button links to the component and from to view a single new site and push it to prod.
    const { data, loading, error } = useQuery(NEWSITE_QUERY);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
        <>
        <div>
            <ul>
                {data.findAllNewSites.map((site) => (
                    <li key={site._id}>{site._id}, {site.siteName}, 
                        <Link to={`/AdminNewSite/${site._id}/${site.siteName}/${site.description}/${site.zipcode}/${site.camping}/${site.pets}/${site.statepark}/${site.park}/${site.beach}/${site.swimmingHole}/${site.spring}/${site.free}/`}>
                            <button id={site._id}>Review Submission</button>
                        </Link>
                    </li>
                ))};
            </ul>
        </div>
        </>
    );
;}

export default NewSite;