import React from 'react';
import Collapsible from 'react-collapsible';
import NewSite from '../admin/Newsite';
import Users from '../admin/Users'
import Site from '../admin/Sites'


const Admin = () => {
    return (
        <>
        <h2>Site Administration</h2>
        <Collapsible trigger="User Administration" className='h2' triggerOpenedClassName ="h2">
            {<Users />}
        </Collapsible>
        <Collapsible trigger="New Sites" className='h2' triggerOpenedClassName ="h2">
            {<NewSite />}
        </Collapsible>
        <Collapsible trigger="All Sites" className='h2' triggerOpenedClassName ="h2">
            {<Site />}
        </Collapsible>
        </>
    )
}

export default Admin;