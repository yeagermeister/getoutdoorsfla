import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { FIND_ONE_USER } from '../../utils/queries';
import Auth  from '../../utils/auth';

const Admin = () => {


  return (
    <>
    
        <li className="nav-item">
          <Link to={`/admin`} className="nav-link active">Admin</Link>
        </li>
   
    </>
  );
};

export default Admin;

