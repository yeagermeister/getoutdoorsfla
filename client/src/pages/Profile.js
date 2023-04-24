import React, { useEffect, useState} from 'react';
import { useQuery } from '@apollo/client';
import { FIND_USER_COMMENTS } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const user = Auth.getProfile();
  const [userID, setUserID] = useState('');

  useEffect(() => {
    if (user){
      setUserID(user.data._id);
    }
  }, [userID]);

  const { loading, data } = useQuery(FIND_USER_COMMENTS, {
    variables: { userID: userID || "" }, // provide a default value if username is falsy
  });

  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to {user.username}'s Profile</h1>
      <div>
        <h2>My Comments:</h2>
        <ul>
          {user.comments ?(user.comments.map((comment) => (
            <li key={comment._id}>
              <a href={`/posts/${comment.post._id}`}>
                {comment.post.title}: {comment.text}
              </a>
            </li>
          ))) : <div> no comments yet!</div>}
         
        </ul>
      </div>
    </div>
  );
};

export default Profile;