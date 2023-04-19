import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
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
        <Link to={`/admin`} className="nav-link active"><a className="nav-link active" aria-current="page" href="./admin">Admin</a></Link>
        </li>
    </>
  );
};

export default Admin;