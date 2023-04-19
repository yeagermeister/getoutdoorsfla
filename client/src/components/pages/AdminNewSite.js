import React from "react";
import { useParams } from 'react-router-dom';



const AdminNewSite = (props) => {
    const { id } = useParams();

    return (
        <>
            <h2>Admin New Sites {id}</h2>
        </>
    )
}

export default AdminNewSite;
