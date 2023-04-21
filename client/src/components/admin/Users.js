import { useQuery, useMutation} from '@apollo/client';
import React from 'react';
import { DELETE_USER } from '../../utils/mutations';
import { USERS_QUERY } from '../../utils/queries';

const Users = () => {    

    const [deleteUser] = useMutation(DELETE_USER, {
        update(cache, { data: { deleteUser } }) {
            const { users } = cache.readQuery({ query: USERS_QUERY });
            cache.writeQuery({
                query: USERS_QUERY,
                data: { users: users.filter(user => user._id !== deleteUser._id) }
            });
        }
    });

    const handleDelete = (userId) => {
        deleteUser({
            variables: { deleteUserId: userId }
        });
    };

    const { data, loading, error } = useQuery(USERS_QUERY);
    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    return (
    <>
    <div>
        <ul>
            {data.findAllUsers.map((user) => (
                <li key={user._id}>{user._id}, {user.username}, {user.email}, {user.admin} <button onClick={() => handleDelete(user._id)}>Delete User</button></li>
            ))};
        </ul>
    </div>
    </>
    );
};

export default Users;