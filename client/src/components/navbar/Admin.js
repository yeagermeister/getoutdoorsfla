import React from 'react';
import { useQuery } from '@apollo/client';
// import { QUERY_USER } from './myQueries';

const Admin = () => {

  // const { loading, error, data } = useQuery(QUERY_USER);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;

  // const ifAdmin = !!data?.myField;

  return (
    <>
        {/* {ifAdmin} */}
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="./admin">Admin</a>
        </li>
    </>
  );
};

export default Admin;