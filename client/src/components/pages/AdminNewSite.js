import React from "react";
import { useParams } from 'react-router-dom';



const AdminNewSite = (props) => {
    const { id } = useParams();

    return (
        <>
            <h2>Administer New Site</h2>
            <h3>{id}</h3>

            
        </>
    )
}

export default AdminNewSite;
