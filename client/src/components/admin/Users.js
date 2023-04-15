import { useQuery, gql } from '@apollo/client';
import React from 'react';

const Users = () => {
    const USERS_QUERY= gql`
    query getUsers {
        users {
            _id
            username
            email
            admin
          }
    }
    `;
    
    const { data, loading, error } = useQuery(USERS_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    
    return (
    <>
    <div>
        <h2>Site Users</h2>
        <ul>
            {data.users.map((user) => (
                <li key={user.id}>{user.id}, {user.username}, {user.email}</li>
            ))};
        </ul>
    </div>
    </>
    );
;}

export default Users;