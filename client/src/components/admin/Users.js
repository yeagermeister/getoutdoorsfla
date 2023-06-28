import { useQuery, useMutation} from '@apollo/client';
import React from 'react';
import { DELETE_USER } from '../../utils/mutations';
import { USERS_QUERY } from '../../utils/queries';
import { useState } from 'react';

const Users = () => {    
    const [userData, setUserData] = useState ([]);

    const [deleteUser] = useMutation(DELETE_USER, {
        update(cache, { data: { deleteUser } }) {
            setUserData((prevUsers) =>
      prevUsers.filter((user) => user._id !== deleteUser._id)
    ) 
        }
    });

    const handleDelete = (userId) => {
        deleteUser({
            variables: { deleteUserId: userId }
        });
        setUserData((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    };

    const { data, loading, error } = useQuery(USERS_QUERY, {
        onCompleted: (data) => {
            setUserData(data.findAllUsers)
        }
    });
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
    <>
    <div>
        <ul>
            {userData.map((user) => (
                <li key={user._id}>{user._id}, {user.username}, {user.email}, {user.admin} <button onClick={() => handleDelete(user._id)}>Delete User</button></li>
            ))}
        </ul>
    </div>
    </>
    );
};

export default Users;